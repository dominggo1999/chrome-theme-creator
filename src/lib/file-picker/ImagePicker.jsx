import React from 'react';
import { loadFile, loadImage } from './utils';
import FilePicker from './FilePicker';

const ImagePicker = ({
  children,
  onChange,
  onError,
  dims,
  ...rest
}) => {
  const handleImage = async (file) => {
    try {
      const dataUrl = await loadFile(file);
      await loadImage(dataUrl, dims);

      // pass base64-encoded string and fileObject to onChange handler
      onChange(dataUrl, file);
    } catch (err) {
      // pass err message to onError handler
      onError(err.message);
    }
  };

  return (
    <FilePicker
      onChange={handleImage}
      onError={onError}
      {...rest}
    >
      {children}
    </FilePicker>
  );
};

export default ImagePicker;
