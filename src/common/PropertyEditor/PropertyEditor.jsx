import React from 'react';
import { useState } from 'react/cjs/react.development';
import Palette from '../Palette/Palette';
import ColorPicker from '../ColorPicker/ColorPicker';
import useColorsStore from '../../store/useColorsStore';
import useImagesStore from '../../store/useImagesStore';
import {
  PropertyEditorMask,
  PropertyEditorWrapper,
  Label,
  Controllers,
  ControllerLeft,
  ControllerRight,
} from './PropertyEditor.style';
import ImagePicker from '../ImagePicker/ImagePicker';
import { propertyNameToLabel } from '../../util/formatting';
import useHoverableStore from '../../store/useHoverableStore';

const PropertyEditor = ({
  propertyName,
  colorsTab,
  changeFileName,
}) => {
  const [active, setActive] = useState(false);

  const setHoverable = useHoverableStore((state) => state.setHoverable);
  const hoverable = useHoverableStore((state) => state.hoverable);

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
  const updateNtpBackgroundSize = useImagesStore((state) => state.updateNtpBackgroundSize);
  const onColorChange = (newColor) => {
    colorsTab ? updateColorValue(propertyName, newColor) : updateImageColor(propertyName, newColor);
  };

  const onImageChange = (newImage, fileObject, width, height) => {
    const name = fileObject.name;
    if(propertyName === 'ntp_background') {
      updateNtpBackgroundSize({ width, height });
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
    resetImage();
  };

  const label = propertyNameToLabel(propertyName);

  return (
    <PropertyEditorWrapper
      hoverable={hoverable}
      active={active}
    >
      <Label>
        <p>
          {label}
        </p>
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

          <ColorPicker
            onChange={onColorChange}
            color={color}
            setActive={setActive}
            setHoverable={setHoverable}
          />
          <Palette
            onChoose={onColorChange}
            setActive={setActive}
            setHoverable={setHoverable}
          />

        </ControllerRight>
      </Controllers>
    </PropertyEditorWrapper>
  );
};

export default PropertyEditor;
