import React, { useState } from 'react';
import fontColorContrast from 'font-color-contrast';
import ImagePicker from '../../lib/file-picker/ImagePicker';
import { PanelWrapper } from '../../common/PanelWrapper';
import {
  OptionItem,
  Options,
  OptionTitle,
  OptionDescription,
  ErrorMessage,
  FileName,
} from './Basic.style';
import Button from '../../common/Button/Button';
import ColorThief from '../../lib/color-thief/color-thief';
import usePaletteStore from '../../store/usePaletteStore';
import useImagesStore from '../../store/useImagesStore';
import useBackgroundNameStore from '../../store/useBackgroundNameStore';
import { mapArrayToHex } from '../../util/colors';
import useColorsStore from '../../store/useColorsStore';
import ExportButton from '../../common/ExportButton/ExportButton';
import ExportMessage from '../../common/ExportMessage/ExportMessage';

const Basic = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [colorGenerationLoading, setColorGenerationLoading] = useState(false);

  const changePallete = usePaletteStore((state) => state.changePallete);

  const updateBackground = useImagesStore((state) => state.updateImagesValue);
  const backgroundImage = useImagesStore((state) => state.images.ntp_background.image);

  const imageName = useBackgroundNameStore((state) => state.name);
  const changeFileName = useBackgroundNameStore((state) => state.changeFileName);

  const updateColorValue = useColorsStore((state) => state.updateValue);
  const updateImageColor = useImagesStore((state) => state.updateImagesColor);
  const updateNtpBackgroundSize = useImagesStore((state) => state.updateNtpBackgroundSize);
  const updateFileName = useImagesStore((state) => state.updateFileName);

  const handleUploadSuccess = (base64, fileObject, width, height) => {
    const name = fileObject.name;
    changeFileName(name);
    updateFileName('ntp_background', name);
    updateNtpBackgroundSize({ width, height });

    setErrorMessage('');
    // Handle image here
    // Change theme background
    updateBackground('ntp_background', base64);
  };

  const handleUploadFailed = (errMsg) => {
    if(errMsg.indexOf('Must upload a file of type') > -1) {
      setErrorMessage(' File type is not supported');
      changeFileName('');
      updateBackground('ntp_background', '');
      updateFileName('ntp_background', '');
      changePallete([]);
    }
  };

  const extractColors = async () => {
    setColorGenerationLoading(true);

    if(backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = async () => {
        const palette = await ColorThief.prototype.getPalette(img, 10);
        const hexColors = mapArrayToHex(palette);
        changePallete(hexColors);

        // Applying palette
        const primaryColor = hexColors[0];
        const secondaryColor = hexColors[1];

        // TODO : refactor this into a loop
        updateImageColor('frame', primaryColor);
        updateImageColor('ntp_background', primaryColor);
        updateImageColor('toolbar', secondaryColor);
        updateImageColor('tab_background', primaryColor);

        updateColorValue('tab_text', fontColorContrast(secondaryColor));
        updateColorValue('tab_background_text', fontColorContrast(primaryColor));
        updateColorValue('bookmark_text', fontColorContrast(secondaryColor));
        updateColorValue('ntp_text', fontColorContrast(primaryColor));
        updateColorValue('button_background', primaryColor);
        updateColorValue('navigation', primaryColor);

        if(primaryColor) {
          setColorGenerationLoading(false);
        }
      };
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
            errorMessage && <ErrorMessage>*{errorMessage}</ErrorMessage>
          }
          {
            !errorMessage && backgroundImage && imageName && <FileName>{imageName}</FileName>
          }

        </OptionItem>

        <OptionItem>
          <OptionTitle>2. Generate Colors</OptionTitle>
          <OptionDescription>
            Generate a color palette for your theme that is generated from the background image
          </OptionDescription>
          <Button
            disabled={!backgroundImage}
            onClick={extractColors}
          >{colorGenerationLoading ? 'loading...' : 'Generate Colors'}
          </Button>
        </OptionItem>
        <OptionItem>

          <OptionTitle>3. Export Theme</OptionTitle>
          <ExportMessage />
          <ExportButton>Export and Download</ExportButton>
        </OptionItem>
      </Options>
    </PanelWrapper>
  );
};

export default Basic;
