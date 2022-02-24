import React, { useState } from 'react';
import { ImagePicker } from 'react-file-picker';
import { PanelWrapper } from '../../common/PanelWrapper';
import {
  OptionItem,
  Options,
  OptionTitle,
  OptionDescription,
  ErrorMessage,
} from './Basic.style';
import Button from '../../common/Button/Button';

const Basic = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const handleUploadSuccess = (base64) => {
    setErrorMessage('');

    // Handle image here
    // Change theme background
  };

  const handleUploadFailed = (errMsg) => {
    if(errorMessage.indexOf('Must upload a file of type') > -1) {
      setErrorMessage(' File type is not supported');
    }
  };

  return (
    <PanelWrapper>
      <Options>
        <OptionItem>
          <OptionTitle>1. Select an image</OptionTitle>
          <OptionDescription>
            Upload an image as a background. Only <span>*.jpg</span>, <span>*.jpeg</span>, <span>*.png</span> and <span>*.gif</span> images will be accepted
          </OptionDescription>
          <ImagePicker
            dims={{
              minWidth: 100, maxWidth: 10000, minHeight: 100, maxHeight: 10000,
            }}
            onChange={handleUploadSuccess}
            onError={handleUploadFailed}
            extensions={['jpg', 'jpeg', 'png', 'gif']}
          >
            <Button>Select image</Button>
          </ImagePicker>
          {
            errorMessage
            && <ErrorMessage>*{errorMessage}</ErrorMessage>
          }

        </OptionItem>

        <OptionItem>
          <OptionTitle>2. Generate Colors</OptionTitle>
          <OptionDescription>
            Generate a color palette for your theme that is generated from the background image
          </OptionDescription>
          <Button>Generate Color</Button>
        </OptionItem>
        <OptionItem>

          <OptionTitle>3. Export Theme</OptionTitle>
          <OptionDescription>
            Export and download your theme as a <span>.zip </span>  file. Check out how to install <a href="#">here</a>
          </OptionDescription>
          <Button>Export and Download</Button>
        </OptionItem>
      </Options>
    </PanelWrapper>
  );
};

export default Basic;
