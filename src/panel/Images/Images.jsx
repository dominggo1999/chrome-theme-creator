/* eslint-disable no-restricted-syntax */
import React from 'react';
import shallow from 'zustand/shallow';
import { PanelWrapper } from '../../common/PanelWrapper';
import { ImagesWrapper } from './Images.style';
import useImagesStore, { initialImages } from '../../store/useImagesStore';
import PropertyEditor from '../../common/PropertyEditor/PropertyEditor';

const colorOnlyProperties = [];
for (const key in initialImages) {
  if (Object.hasOwnProperty.call(initialImages, key)) {
    const item = initialImages[key];
    console.log(item);
    if(item.colorOnly) {
      colorOnlyProperties.push(item.name);
    }
  }
}

const Images = () => {
  const imagesProperties = useImagesStore((state) => Object.keys(state.images), shallow);

  return (
    <PanelWrapper>
      <ImagesWrapper>
        {
          imagesProperties.map((item) => {
            return (
              <PropertyEditor
                key={`colors${item}`}
                propertyName={item}
                colorOnly={colorOnlyProperties.includes(item)}
              />
            );
          })
        }
      </ImagesWrapper>
    </PanelWrapper>
  );
};

export default Images;
