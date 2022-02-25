import React from 'react';
import Palette from '../Palette/Palette';
import ColorPicker from '../ColorPicker/ColorPicker';
import useColorsStore from '../../store/useColorsStore';
import useImagesStore from '../../store/useImagesStore';
import { PropertyEditorWrapper, Label, Controllers } from './PropertyEditor.style';
import ImagePicker from '../ImagePicker/ImagePicker';
import { propertyNameToLabel } from '../../util/formatting';

const PropertyEditor = ({
  propertyName,
  colorOnly = false,
  colorsTab,
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

  const onColorChange = (newColor) => {
    colorsTab ? updateColorValue(propertyName, newColor) : updateImageColor(propertyName, newColor);
  };

  const onImageChange = (newImage) => {
    updateImageValue(propertyName, newImage);
  };

  const resetImage = () => {
    updateImageValue(propertyName, '');
  };

  const onImageError = () => {
    resetImage();
  };

  const label = propertyNameToLabel(propertyName);

  return (
    <PropertyEditorWrapper>
      <Label>
        {label}
      </Label>
      <Controllers>
        {
          !colorOnly && (
            <ImagePicker
              image={image}
              resetImage={resetImage}
              onImageChange={onImageChange}
              onImageError={onImageError}
            />
          )
        }

        <ColorPicker
          onChange={onColorChange}
          color={color}
        />
        <Palette
          onChoose={onColorChange}
          a="1"
        />
      </Controllers>
    </PropertyEditorWrapper>
  );
};

export default PropertyEditor;
