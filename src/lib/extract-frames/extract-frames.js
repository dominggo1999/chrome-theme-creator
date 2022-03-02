// eslint-disable-next-line import/no-unresolved
import GenerateGIF from './wasm-gif-encoder?worker';
// We need to import the module first

export const extract = async (opts) => {
  return new Promise((resolve, reject) => {
    const {
      input,
      width,
      height,
      targetWidth,
      targetHeight,
    } = opts;

    const offscreenCanvas = new OffscreenCanvas(width, height);
    const worker = new GenerateGIF();

    worker.postMessage({
      message: 'render-gif',
      input,
      targetWidth,
      targetHeight,
      canvas: offscreenCanvas,
    }, [offscreenCanvas]);

    worker.onmessage = (response) => {
      let e = JSON.parse(response.data);

      if(e.message === 'gif generation is finished') {
        resolve(e.b64GIF);
        e = null;
        worker.onmessage = null;
        worker.terminate();
      }
    };
  });
};

export default extract;
