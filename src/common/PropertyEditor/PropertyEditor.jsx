import React from 'react';
import Palette from '../Palette/Palette';
import ColorPicker from '../ColorPicker/ColorPicker';
import useColorsStore from '../../store/useColorsStore';
import useImagesStore from '../../store/useImagesStore';
import {
  PropertyEditorWrapper,
  Label,
  Controllers,
  ControllerLeft,
  ControllerRight,
} from './PropertyEditor.style';
import ImagePicker from '../ImagePicker/ImagePicker';
import { propertyNameToLabel } from '../../util/formatting';

const PropertyEditor = ({
  propertyName,
  imageOnly,
  colorsTab,
  changeFileName,
}) => {
  const color = colorsTab
    ? useColorsStore(((state) => state.colors[propertyName].value))
    : useImagesStore(((state) => state.images[propertyName].color));

  const image = colorsTab
    ? null
    : useImagesStore(((state) => state.images[propertyName].image));

  const updateColorValue = useColorsStore((state) => state.updateValue);
  const updateImageValue = useImagesStore((state) => state.updateImagesValue);
  const updateImageColor = useImagesStore((state) => state.updateImagesColor);
  const updateFileName = useImagesStore((state) => state.updateFileName);

  const onColorChange = (newColor) => {
    colorsTab ? updateColorValue(propertyName, newColor) : updateImageColor(propertyName, newColor);
  };

  const onImageChange = (newImage, fileObject) => {
    const name = fileObject.name;
    if(propertyName === 'ntp_background') {
      changeFileName(name);
    }

    updateFileName(propertyName, name);
    updateImageValue(propertyName, newImage);
  };

  const resetImage = () => {
    updateImageValue(propertyName, '');
    updateFileName(propertyName, '');
  };

  const onImageError = (err) => {
    console.log(err);
    resetImage();
  };

  const label = propertyNameToLabel(propertyName);

  return (
    <PropertyEditorWrapper>
      <Label>
        {label}
      </Label>
      <Controllers>
        <ControllerLeft>

          {
            !colorsTab
            && (
            <ImagePicker
              propertyName={propertyName}
              image={image}
              resetImage={resetImage}
              onImageChange={onImageChange}
              onImageError={onImageError}
            />
            )
          }
        </ControllerLeft>

        <ControllerRight colorsTab={colorsTab}>

          {
            !imageOnly && (
              <>
                <ColorPicker
                  onChange={onColorChange}
                  color={color}
                />
                <Palette
                  onChoose={onColorChange}
                  a="1"
                />
              </>
            )
          }
        </ControllerRight>
      </Controllers>
    </PropertyEditorWrapper>
  );
};

export default PropertyEditor;
