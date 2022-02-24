import React from 'react';
import FileInput from './FileInput';

const FilePicker = ({
  onError,
  onChange,
  maxSize,
  extensions,
  children,
  style,
  ...rest
}) => {
  const validate = (file) => {
    // make sure a file was provided in the first place
    if (!file) {
      onError('Failed to upload a file.');
      return;
    }

    // if we care about file extensions
    if (extensions) {
      const uploadedFileExt = file.name
        .split('.')
        .pop()
        .toLowerCase();
      const isValidFileExt = extensions
        .map((ext) => ext.toLowerCase())
        .includes(uploadedFileExt);

      if (!isValidFileExt) {
        onError(`Must upload a file of type: ${extensions.join(' or ')}`);
        return;
      }
    }

    // convert maxSize from megabytes to bytes
    const maxBytes = maxSize * 1000000;

    if (file.size > maxBytes) {
      onError(`File size must be less than ${maxSize} MB.`);
      return;
    }

    // return native file object
    onChange(file);
  };

  return (
    <FileInput
      onChange={validate}
      style={style}
      {...rest}
    >
      {children}
    </FileInput>
  );
};

export default FilePicker;
