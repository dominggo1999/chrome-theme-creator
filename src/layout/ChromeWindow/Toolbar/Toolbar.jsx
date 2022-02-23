import React from 'react';
import tw, { styled } from 'twin.macro';

export const StyledToolbar = styled.div`
  ${tw`
    absolute
    bottom-0
    bg-black 
    text-white
    px-1
    w-1/5
    rounded-tr-sm
    text-sm
  `}
`;

const Toolbar = () => {
  return (
    <StyledToolbar>
      https://www.google.com/
    </StyledToolbar>
  );
};

export default Toolbar;
