import React from 'react';
import { ImageWrapper } from './DocumentationImage.style';

const DocumentationImage = ({ src, alt }) => {
  return (
    <ImageWrapper>
      <img
        src={src}
        alt={alt}
      />
    </ImageWrapper>
  );
};

export default DocumentationImage;
