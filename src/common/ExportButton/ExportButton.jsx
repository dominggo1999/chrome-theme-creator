/* eslint-disable no-restricted-syntax */
import React from 'react';
import hexToHsl from 'hex-to-hsl';
import { saveAs } from 'file-saver';
import Button from '../Button/Button';
import useColorsStore, { initialColors } from '../../store/useColorsStore';
import useImagesStore, { initialImages } from '../../store/useImagesStore';
import { hexToRgbArray } from '../../util/colors';

const THEME_NAME = 'my theme';
const MANIFEST_VERSION = 2;
const VERSION = '1.0';
const DESCRIPTION = '';

const ExportButton = ({ children, ...rest }) => {
  const getColors = useColorsStore((state) => state.getColors);
  const getImages = useImagesStore((state) => state.getImages);

  const exportAndDownload = () => {
    const colors = getColors();
    const images = getImages();

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

    const manifest = {
      name: THEME_NAME,
      version: VERSION,
      description: DESCRIPTION,
      manifest_version: MANIFEST_VERSION,
      theme: {
        images: {},
        colors: finalColors,
        tints,
      },
      properties: { ntp_background_alignment: 'bottom', ntp_background_repeat: 'no-repeat' },
    };

    // Create a blob of the data
    const fileToSave = new Blob([JSON.stringify(manifest)], {
      type: 'application/json',
    });

    saveAs(fileToSave, 'manifest.json');
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
