import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Picker from '../../lib/file-picker/ImagePicker';
import {
  ImagePickerWrapper,
  OpenPickerButton,
  SuccessResult,
  ErrorResult,
} from './ImagePicker.style';

const ImagePicker = ({
  image,
  resetImage,
  onImageError,
  onImageChange,
  propertyName,
}) => {
  const [errorMessage, setErrorMessage] = useState();

  const handleUploadSuccess = (base64, fileObject) => {
    onImageChange(base64, fileObject);
    setErrorMessage('');
  };

  const handleUploadFailed = (errMsg) => {
    onImageError(errorMessage);
    setErrorMessage(errMsg);
  };

  const reset = () => {
    resetImage();
    setErrorMessage('');
  };

  const allowedExtensions = ['jpg', 'jpeg', 'png'];
  if(propertyName === 'ntp_background') {
    allowedExtensions.push('gif');
  }

  return (
    <>
      <ImagePickerWrapper>

        {
          !image && !errorMessage
          && (
          <Picker
            dims={{
              minWidth: 100, maxWidth: 10000, minHeight: 100, maxHeight: 10000,
            }}
            onChange={handleUploadSuccess}
            onError={handleUploadFailed}
            extensions={allowedExtensions}
          >
            <OpenPickerButton>Choose Image</OpenPickerButton>
          </Picker>
          )
        }

        {
          image
          && (
            <div>
              <SuccessResult>
                <p>Loaded</p>
                <span
                  onClick={reset}
                  title="Remove Image"
                  role="button"
                >
                  <AiOutlineClose />
                </span>
              </SuccessResult>
            </div>
          )
        }

        {
          errorMessage
          && (
            <div>
              <ErrorResult>
                <p>Error</p>

                <span
                  title="Close Error"
                  role="button"
                  onClick={reset}
                >
                  <AiOutlineClose />
                </span>
              </ErrorResult>
            </div>
          )
        }
      </ImagePickerWrapper>
    </>
  );
};

export default ImagePicker;
