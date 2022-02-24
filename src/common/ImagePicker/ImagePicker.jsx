import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Picker from '../../lib/file-picker/ImagePicker';
import {
  ImagePickerWrapper,
  OpenPickerButton,
  SuccessResult,
  ErrorResult,
} from './ImagePicker.style';

const ImagePicker = () => {
  // Image value is from props
  const [image, setImage] = useState();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleUploadSuccess = (base64, fileObject) => {
    setSuccess(true);
    setImage(base64);
  };

  const handleUploadFailed = (errMsg) => {
    setSuccess(false);
    setErrorMessage(errMsg);
  };

  const reset = () => {
    setImage('');
    setErrorMessage('');
    setSuccess(false);
  };

  return (
    <>
      <ImagePickerWrapper>

        {
          !image && !success && !errorMessage
          && (
          <Picker
            dims={{
              minWidth: 100, maxWidth: 10000, minHeight: 100, maxHeight: 10000,
            }}
            onChange={handleUploadSuccess}
            onError={handleUploadFailed}
            extensions={['jpg', 'jpeg', 'png', 'gif']}
          >
            <OpenPickerButton>Choose Image</OpenPickerButton>
          </Picker>
          )
        }

        {
          success && !errorMessage
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
          errorMessage && !success
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
