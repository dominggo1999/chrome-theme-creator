import ndarray from 'ndarray';
import ops from 'ndarray-ops';
import getPixels from '../get-pixels/getPixels';

function handleData(array, data, frame) {
  let i;
  let j;
  const ptr = 0;
  let
    c;
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

const extract = async (opts) => {
  const {
    input,
    coalesce = true,
  } = opts;

  const { results, framesInfo } = await getPixels(input);

  if (results.shape.length < 4) {
    throw new Error('"url" input should be multi-frame GIF.');
  }

  const frameData = [];
  let maxAccumulatedFrame = 0;

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
        const frame = results.pick(f);
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

    const myArray = results.pick(i); //= your data in a UInt8Array
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = myArray.shape[0];
    canvas.height = myArray.shape[1];
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    data = handleData(myArray, data);
    context.putImageData(imageData, 0, 0);

    frameData.push(canvas.toDataURL());
  }

  return { frameData, framesInfo };
};

export default extract;
