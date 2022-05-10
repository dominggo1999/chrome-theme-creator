import tw, { styled } from 'twin.macro';

export const ImageWrapper = styled.div`
  ${tw`
    w-full 
    mb-5
  `}

  img {
    ${tw`
      w-full 
      h-auto
    `}
  }  
`;
