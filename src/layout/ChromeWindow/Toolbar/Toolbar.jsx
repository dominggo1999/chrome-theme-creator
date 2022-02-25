import React from 'react';
import tw, { styled } from 'twin.macro';
import fontColorContrast from 'font-color-contrast';
import { useSelectorImagesColor } from '../../../hooks/useSelectorColor';

export const StyledToolbar = styled.div`
  ${tw`
    absolute
    bottom-0
    px-1
    w-1/5
    rounded-tr-sm
    text-sm
    border
    border-black
    border-opacity-20
  `}
`;

const Toolbar = () => {
  const frameBackgroundColor = useSelectorImagesColor('frame');

  return (
    <StyledToolbar
      style={{
        backgroundColor: frameBackgroundColor,
        color: fontColorContrast(frameBackgroundColor),
      }}
    >
      https://www.google.com/
    </StyledToolbar>
  );
};

export default Toolbar;
