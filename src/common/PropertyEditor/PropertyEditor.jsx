import React from 'react';
import ImagePicker from '../../lib/file-picker/ImagePicker';
import Palette from '../Palette/Palette';
import ColorPicker from '../ColorPicker/ColorPicker';
import useColorsStore from '../../store/useColorsStore';
import useImagesStore from '../../store/useImagesStore';
import { PropertyEditorWrapper, Label, Controllers } from './PropertyEditor.style';

const PropertyEditor = ({
  propertyName,
  colorOnly,
}) => {
  const color = colorOnly
    ? useColorsStore(((state) => state.colors[propertyName].value))
    : useImagesStore(((state) => state.images[propertyName].color));

  const image = colorOnly
    ? null
    : useImagesStore(((state) => state.images[propertyName].value));

  const updateColorValue = useColorsStore((state) => state.updateValue);
  const updateImageValue = useImagesStore((state) => state.updateValue);

  const onColorChange = (newColor) => {
    updateColorValue(propertyName, newColor);
  };

  const handlePaletteChoose = (newColor) => {
    updateColorValue(propertyName, newColor);
  };

  const onImageChange = (newImage) => {
    updateImageValue(propertyName, newImage);
  };

  return (
    <PropertyEditorWrapper>
      <Label>
        {propertyName}
      </Label>
      <Controllers>
        <ColorPicker
          onChange={onColorChange}
          color={color}
        />
        <Palette
          onChoose={handlePaletteChoose}
          a="1"
        />
      </Controllers>
    </PropertyEditorWrapper>
  );
};

export default PropertyEditor;
