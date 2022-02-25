/* eslint-disable no-restricted-syntax */
import React from 'react';
import shallow from 'zustand/shallow';
import { PanelWrapper } from '../../common/PanelWrapper';
import { ImagesWrapper } from './Images.style';
import useImagesStore, { initialImages } from '../../store/useImagesStore';
import PropertyEditor from '../../common/PropertyEditor/PropertyEditor';

const imageOnlyProperties = [];
for (const key in initialImages) {
  if (Object.hasOwnProperty.call(initialImages, key)) {
    const item = initialImages[key];
    if(item.imageOnly) {
      imageOnlyProperties.push(item.name);
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
                imageOnly={imageOnlyProperties.includes(item)}
              />
            );
          })
        }
      </ImagesWrapper>
    </PanelWrapper>
  );
};

export default Images;
