import { GifReader } from 'omggif';
import ndarray from 'ndarray';

const getPixels = async (dataUrl) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  const arrayBuffer = await blob.arrayBuffer();
  const intArray = await new Uint8Array(arrayBuffer);
  const reader = await new GifReader(intArray);
  const framesInfo = [];

  if(reader.numFrames() > 0) {
    const nshape = [reader.numFrames(), reader.height, reader.width, 4];
    const ndata = new Uint8Array(nshape[0] * nshape[1] * nshape[2] * nshape[3]);
    const result = ndarray(ndata, nshape);
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < reader.numFrames(); ++i) {
      reader.decodeAndBlitFrameRGBA(i, ndata.subarray(
        result.index(i, 0, 0, 0),
        result.index(i + 1, 0, 0, 0),
      ));

      framesInfo.push(reader.frameInfo(i));
    }

    return { results: result.transpose(0, 2, 1), framesInfo };
  }
};
export default getPixels;
