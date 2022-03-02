import ndarray from 'ndarray';
import ops from 'ndarray-ops';
import init, {
  resize, PhotonImage,
} from 'photon-web';
import GifEncoder from '../gif-encoder/encoder';
import getPixels from '../get-pixels/getPixels';

//* *blob to dataURL**
const blobToDataURL = (blob, callback) => {
  return new Promise((fulfill, reject) => {
    const a = new FileReader();
    a.onload = (e) => fulfill(e.target.result);
    a.readAsDataURL(blob);
  });
};

const getBase64 = async (canvas) => {
  try {
    const blob = await canvas[canvas.convertToBlob
      ? 'convertToBlob' // specs
      : 'toBlob' // current Firefox
    ]();
    const url = await blobToDataURL(blob);
    return url;
  } catch (error) {
    console.log(error);
  }
};

function handleData(array, data, frame) {
  if (array.shape.length === 4) {
    return handleData(array.pick(frame), data, 0);
  } if (array.shape.length === 3) {
    if (array.shape[2] === 3) {
      ops.assign(
        ndarray(data,
          [array.shape[0], array.shape[1], 3],
          [4, 4 * array.shape[0], 1]),
        array,
      );
      ops.assigns(
        ndarray(data,
          [array.shape[0] * array.shape[1]],
          [4],
          3),
        255,
      );
    } else if (array.shape[2] === 4) {
      ops.assign(
        ndarray(data,
          [array.shape[0], array.shape[1], 4],
          [4, array.shape[0] * 4, 1]),
        array,
      );
    } else if (array.shape[2] === 1) {
      ops.assign(
        ndarray(data,
          [array.shape[0], array.shape[1], 3],
          [4, 4 * array.shape[0], 1]),
        ndarray(array.data,
          [array.shape[0], array.shape[1], 3],
          [array.stride[0], array.stride[1], 0],
          array.offset),
      );
      ops.assigns(
        ndarray(data,
          [array.shape[0] * array.shape[1]],
          [4],
          3),
        255,
      );
    } else {
      return new Error('Incompatible array shape');
    }
  } else if (array.shape.length === 2) {
    ops.assign(
      ndarray(data,
        [array.shape[0], array.shape[1], 3],
        [4, 4 * array.shape[0], 1]),
      ndarray(array.data,
        [array.shape[0], array.shape[1], 3],
        [array.stride[0], array.stride[1], 0],
        array.offset),
    );
    ops.assigns(
      ndarray(data,
        [array.shape[0] * array.shape[1]],
        [4],
        3),
      255,
    );
  } else {
    return new Error('Incompatible array shape');
  }
  return data;
}

let context;
let imageData;
let data;
let result;
let b64GIF;

let pixels;
let results;
let framesInfo;
let frame;
let encoder;

const renderGIF = async (targetWidth, targetHeight, input, canvas, scaledCanvas) => {
  pixels = await getPixels(input);
  results = pixels.results;
  framesInfo = pixels.framesInfo;

  if (results.shape.length < 4) {
    throw new Error('"url" input should be multi-frame GIF.');
  }
  const frameData = [];
  let maxAccumulatedFrame = 0;
  let UInt8Array;

  for (let i = 0; i < results.shape[0]; i += 1) {
    // eslint-disable-next-line no-loop-func

    if (i > maxAccumulatedFrame) {
      // for each frame, replace any invisible pixel with
      // the corresponding pixel from the previous frame (beginning
      // with the second frame).
      // to avoid doing too much work at once we only compute the
      // frames up to and including the requested frame.
      let lastFrame = results.pick(maxAccumulatedFrame);
      for (let f = maxAccumulatedFrame + 1; f <= i; f += 1) {
        frame = results.pick(f);
        for (let x = 0; x < frame.shape[0]; x += 1) {
          for (let y = 0; y < frame.shape[1]; y += 1) {
            if (frame.get(x, y, 3) === 0) {
              // if alpha is fully transparent, use the pixel
              // from the last frame
              frame.set(x, y, 0, lastFrame.get(x, y, 0));
              frame.set(x, y, 1, lastFrame.get(x, y, 1));
              frame.set(x, y, 2, lastFrame.get(x, y, 2));
              frame.set(x, y, 3, lastFrame.get(x, y, 3));
            }
          }
        }
        lastFrame = frame;
      }
      maxAccumulatedFrame = i;
    }

    UInt8Array = results.pick(i); //= your data in a UInt8Array

    context = canvas.getContext('2d');
    canvas.width = UInt8Array.shape[0];
    canvas.height = UInt8Array.shape[1];
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    handleData(UInt8Array, imageData.data);
    context.putImageData(imageData, 0, 0);

    frameData.push(getBase64(canvas));
  }

  encoder = new GifEncoder(targetWidth, targetHeight);
  encoder.setRepeat(0);
  encoder.writeHeader();

  return Promise.all(frameData)
    .then((urls) => {
      urls.forEach((item, id) => {
        const photonImage = PhotonImage.new_from_base64(item.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, ''));
        const resizedImage = resize(photonImage, targetWidth, targetHeight, 1);
        const output = resizedImage.get_image_data();

        encoder.setDelay(framesInfo[id].delay * 10);
        encoder.addFrame(output.data);
      });
    }).then(() => {
      encoder.finish();
      result = encoder.stream().getData();
      b64GIF = `data:image/gif;base64, ${btoa(result)}`;

      postMessage(JSON.stringify({
        message: 'gif generation is finished',
        b64GIF,
      }));
      URL.revokeObjectURL(b64GIF);
      encoder = null;
    })
    .catch((err) => {
      console.log(err);
    });
};

onmessage = (e) => {
  if(e.data.message === 'render-gif') {
    const {
      targetWidth, targetHeight, input, canvas, scaledCanvas,
    } = e.data;

    init()
      .then(() => {
        renderGIF(targetWidth, targetHeight, input, canvas, scaledCanvas);
      });
  }
};
