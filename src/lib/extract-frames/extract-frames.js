export const extract = async (opts, worker) => {
  return new Promise((resolve, reject) => {
    const {
      input,
      width,
      height,
      targetWidth,
      targetHeight,
    } = opts;

    const offscreenCanvas = new OffscreenCanvas(width, height);

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
