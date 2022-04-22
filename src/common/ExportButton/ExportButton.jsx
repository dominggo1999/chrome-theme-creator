/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// https://stackoverflow.com/questions/38787951/disabling-data-url-jpg-cache
import React, { useRef, useState, useEffect } from 'react';
import hexToHsl from 'hex-to-hsl';
import { saveAs } from 'file-saver';
import domToImage from '@yzfe/dom-to-image';
import JSZip from 'jszip';
import Button from '../Button/Button';
import useColorsStore, { initialColors } from '../../store/useColorsStore';
import useImagesStore, { initialImages } from '../../store/useImagesStore';
import { hexToRgbArray } from '../../util/colors';

// eslint-disable-next-line import/no-unresolved
import GenerateGIF from '../../lib/extract-frames/wasm-gif-encoder?worker';
import { extract } from '../../lib/extract-frames/extract-frames';
import useNtpSettingsStore from '../../store/useNtpSettingsStore';

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

let gif;
const generateNtpBackground = async (dataUrl, fileName, backgroundSize, backgroundImage, worker) => {
  if(backgroundSize === 'normal') return dataUrl;

  const ext = getExtension(fileName).toLowerCase();
  const page = document.getElementById('frame');

  const w = backgroundImage.width;
  const h = backgroundImage.height;
  const aspectRatio = w / h;
  const scaledWidth = page.clientWidth;
  const scaledHeight = scaledWidth / aspectRatio;

  if(ext === 'gif') {
    gif = extract({
      input: dataUrl,
      width: w,
      height: h,
      targetWidth: scaledWidth,
      targetHeight: scaledHeight,
    }, worker);

    return gif;
  }

  let img = new Image();
  img.src = dataUrl;
  let elem = document.createElement('canvas');
  const ctx = elem.getContext('2d');
  elem.width = scaledWidth;
  elem.height = scaledHeight;
  ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

  const newImageDataURL = ctx.canvas.toDataURL(`image/${getExtension(fileName).toLowerCase()}`, 1.0);
  elem = null;
  img.src = null;
  img = null;

  return newImageDataURL;
};

const validateImage = async (dataUrl, fileName) => {
  const ext = getExtension(fileName).toLowerCase();

  if(ext !== 'jpg') {
    return dataUrl;
  }

  let img = new Image();
  img.src = dataUrl;
  let elem = document.createElement('canvas');
  const ctx = elem.getContext('2d');
  elem.width = img.naturalWidth;
  elem.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
  const newImageDataURL = ctx.canvas.toDataURL('image/png', 1.0);
  elem = null;
  img.src = null;
  img = null;

  return newImageDataURL;
};

const ExportButton = ({ children, ...rest }) => {
  const getColors = useColorsStore((state) => state.getColors);
  const getImages = useImagesStore((state) => state.getImages);
  const getNtpSettings = useNtpSettingsStore((state) => state.getNtpSettings);
  const worker = useRef(null);
  const [loading, setLoading] = useState(false);
  const isSubscribed = useRef(false);

  const exportAndDownload = async () => {
    worker.current = new GenerateGIF();

    setLoading(true);

    const colors = getColors();
    const images = getImages();

    const settings = getNtpSettings();
    const {
      horizontalAlignment,
      verticalAlignment,
      repeatMode,
      backgroundSize,
    } = settings;

    const backgroundPosition = `${horizontalAlignment} ${verticalAlignment}`.trim();

    const finalImages = {};

    try {
      for (const key in images) {
        if (Object.hasOwnProperty.call(images, key)) {
          const item = images[key];

          // Return image is exist
          if(item.image) {
            const imageDataURL = item.name === 'ntp_background'
              ? await generateNtpBackground(item.image, item.fileName, backgroundSize, images.ntp_background, worker.current)
              : await validateImage(item.image, item.fileName, item.width, item.height);

            const ext = getExtension(item.fileName);

            finalImages[key] = {
              dataUrl: imageDataURL,
              ext: ext === 'jpg' ? 'png' : ext,
            };
          }else if(item.name !== 'ntp_background') {
            // Generate image from color here if image not exist
            const replacementImage = await generateImage(item.color, item.width, item.height);
            finalImages[key] = {
              dataUrl: replacementImage,
              ext: 'png',
            };
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    let finalColors = {};
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

    let imagesFiles = {};

    for (const key in finalImages) {
      if (Object.hasOwnProperty.call(finalImages, key)) {
        const item = finalImages[key];
        const name = `theme_${key}.${item.ext}`;
        imagesFiles[`theme_${key}`] = `images/${name}`;
        themeFolder.file(name, item.dataUrl.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, ''), { base64: true });
        window.URL.revokeObjectURL(item.dataUrl);
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
          ntp_background_alignment: backgroundSize === 'normal' ? backgroundPosition : verticalAlignment,
          ntp_background_repeat: repeatMode || 'no-repeat',
        },
      },
    };

    zip.file('manifest.json', JSON.stringify(manifest));

    zip.generateAsync({ type: 'blob' }).then((content) => {
      imagesFiles = null;
      finalColors = null;
      gif = null;
      setLoading(false);
      saveAs(content, 'my-theme.zip');
    });
  };

  useEffect(() => {
    isSubscribed.current = true;

    return () => {
      isSubscribed.current = false;
      worker?.current?.terminate();
    };
  }, []);

  return (
    <Button
      disabled={loading}
      onClick={!loading ? exportAndDownload : null}
      {...rest}
    >
      {!loading ? children : 'loading...'}
    </Button>
  );
};

export default ExportButton;
