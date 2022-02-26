/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react';
import hexToHsl from 'hex-to-hsl';
import { saveAs } from 'file-saver';
import domToImage from '@yzfe/dom-to-image';
import JSZip from 'jszip';
import { GifReader } from 'omggif';
import { decode } from 'base64-arraybuffer';
import resizeImageData from 'resize-image-data';
import Button from '../Button/Button';
import useColorsStore, { initialColors } from '../../store/useColorsStore';
import useImagesStore, { initialImages } from '../../store/useImagesStore';
import { hexToRgbArray } from '../../util/colors';

import extract from '../../lib/extract-frames/extract-frames';

const THEME_NAME = 'my theme';
const MANIFEST_VERSION = 2;
const VERSION = '1.0';
const DESCRIPTION = '';

const getExtension = (filename) => filename.split('.').pop();

const generateImage = (color, w, h) => {
  const box = document.createElement('div');
  box.style.width = `${w}px`;
  box.style.height = `${h}px`;
  box.style.backgroundColor = color;
  box.style.zIndex = -1;
  document.body.appendChild(box);

  return domToImage.toPng(box)
    .then((dataUrl) => {
      box.remove();
      return dataUrl;
    });
};

// function to retrieve an image
function loadImage(url) {
  return new Promise((fulfill, reject) => {
    const image = new Image();
    image.onload = () => fulfill(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });
}

const gif2frames = async (dataUrl, width, height) => {
  // eslint-disable-next-line no-undef
  const GIFJS = GIF;
  const gif = new GIFJS({
    workers: 2,
    quality: 10,
    workerScript: '/gif-js/gif.worker.js',
  });

  const { frameData, framesInfo } = await extract({
    input: dataUrl,
  });

  const base64GIF = await Promise.all(frameData.map((i) => loadImage(i)))
    .then((images) => {
      const scaledFrames = images.map((img) => {
        const elem = document.createElement('canvas');
        const newCtx = elem.getContext('2d');
        elem.width = width;
        elem.height = height;
        newCtx.drawImage(img, 0, 0, width, height);
        const scaledBase64 = newCtx.canvas.toDataURL('image/png', 1.0);
        img.src = scaledBase64;
        return img;
      });

      return scaledFrames;
    })
    .then((images) => {
      const getNewGIF = () => {
        return new Promise((fulfill, reject) => {
          // add frames for each image
          images.forEach((image, id) => {
            gif.addFrame(image, { delay: framesInfo[id].delay * 10 || 0 });
          });

          gif.on('finished', (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result;
              gif.freeWorkers.forEach((w) => w.terminate());
              gif.abort();

              fulfill(base64data);
            };
          });

          gif.render();
        });
      };
      return getNewGIF();
    });

  return base64GIF;
};

const generateNtpBackground = async (dataUrl, fileName) => {
  const ext = getExtension(fileName).toLowerCase();
  const page = document.getElementById('frame');
  const image = document.getElementById('ntp_background');

  const w = image.clientWidth;
  const h = image.clientHeight;
  const aspectRatio = w / h;
  const scaledWidth = page.clientWidth;
  const scaledHeight = scaledWidth / aspectRatio;

  if(ext === 'gif') {
    // loadGifFrameList(dataUrl, scaledWidth, scaledHeight);
    return gif2frames(dataUrl, scaledWidth, scaledHeight);
  }

  const img = new Image();
  img.src = dataUrl;
  const elem = document.createElement('canvas');
  const ctx = elem.getContext('2d');
  elem.width = scaledWidth;
  elem.height = scaledHeight;
  ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

  return ctx.canvas.toDataURL(`image/${getExtension(fileName).toLowerCase()}`, 1.0);
};

const ExportButton = ({ children, ...rest }) => {
  const getColors = useColorsStore((state) => state.getColors);
  const getImages = useImagesStore((state) => state.getImages);

  const exportAndDownload = async () => {
    const colors = getColors();
    const images = getImages();

    const finalImages = {};

    for (const key in images) {
      if (Object.hasOwnProperty.call(images, key)) {
        const item = images[key];

        // If there is no color but image is present
        if(item.imageOnly && item.image) {
          finalImages[key] = {
            dataUrl: item.image,
            ext: getExtension(item.fileName),
          };
        }

        if(!item.imageOnly) {
          // Return image is exist
          if(item.image) {
            const scaledDataUrl = await generateNtpBackground(item.image, item.fileName);
            finalImages[key] = {
              dataUrl: scaledDataUrl,
              ext: getExtension(item.fileName),
            };
          }else if(item.name !== 'ntp_background') {
            // Generate image from color here if image not exist
            const replacementImage = await generateImage(item.color, item.width, item.heigth);
            finalImages[key] = {
              dataUrl: replacementImage,
              ext: 'png',
            };
          }
        }
      }
    }

    const finalColors = {};
    const tints = {};

    for (const key in colors) {
      if (Object.hasOwnProperty.call(colors, key)) {
        const item = colors[key];

        if(item.value !== initialColors[key].value && item.name !== 'navigation') {
          const rgbArray = hexToRgbArray(item.value);
          finalColors[key] = rgbArray;
        }
      }
    }

    for (const key in images) {
      if (Object.hasOwnProperty.call(images, key)) {
        const item = images[key];

        if(item.color !== initialImages[key].color) {
          const rgbArray = hexToRgbArray(item.color);
          finalColors[key] = rgbArray;
        }
      }
    }

    // Navigation need to be in hsl
    tints.buttons = hexToHsl(colors.navigation.value).map((i, id) => {
      if(id > 0) {
        return i / 100;
      }

      return i / 360;
    });

    // Zip here

    const zip = new JSZip();
    const themeFolder = zip.folder('images');

    const imagesFiles = {};
    // console.log(finalImages);

    for (const key in finalImages) {
      if (Object.hasOwnProperty.call(finalImages, key)) {
        const item = finalImages[key];
        const name = `theme_${key}.${item.ext}`;
        imagesFiles[`theme_${key}`] = `images/${name}`;
        themeFolder.file(name, item.dataUrl.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, ''), { base64: true });
      }
    }

    const manifest = {
      name: THEME_NAME,
      version: VERSION,
      description: DESCRIPTION,
      manifest_version: MANIFEST_VERSION,
      theme: {
        images: imagesFiles,
        colors: finalColors,
        tints,
        properties: {
          ntp_background_alignment: 'bottom',
          ntp_background_repeat: 'no-repeat',
        },
      },
    };

    zip.file('manifest.json', JSON.stringify(manifest));

    zip.generateAsync({ type: 'blob' }).then((content) => {
      // see FileSaver.js
      saveAs(content, 'my-theme.zip');
    });
  };

  useEffect(() => {
    // loadGifFrameList('https://c.tenor.com/6MsukwHKJ58AAAAM/ara-anime.gif');
  }, []);

  return (
    <Button
      onClick={exportAndDownload}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ExportButton;
