/* eslint-disable no-restricted-syntax */
import React from 'react';
import hexToHsl from 'hex-to-hsl';
import { saveAs } from 'file-saver';
import domToImage from '@yzfe/dom-to-image';
import JSZip from 'jszip';
import Button from '../Button/Button';
import useColorsStore, { initialColors } from '../../store/useColorsStore';
import useImagesStore, { initialImages } from '../../store/useImagesStore';
import { hexToRgbArray } from '../../util/colors';

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
  document.body.appendChild(box);

  return domToImage.toPng(box)
    .then((dataUrl) => {
      return dataUrl;
    });
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
            finalImages[key] = {
              dataUrl: item.image,
              ext: getExtension(item.fileName),
            };
          }else if(item.name !== 'ntp_background') {
            // Generate image from color here if image not exist
            // eslint-disable-next-line no-await-in-loop
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
      },
      properties: { ntp_background_alignment: 'bottom', ntp_background_repeat: 'no-repeat' },
    };

    zip.file('manifest.json', JSON.stringify(manifest));

    zip.generateAsync({ type: 'blob' }).then((content) => {
      // see FileSaver.js
      saveAs(content, 'my-theme.zip');
    });
  };

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
