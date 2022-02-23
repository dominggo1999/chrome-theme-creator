import tw, { styled } from 'twin.macro';

export const StyledFrame = styled.div`
  ${tw`
    bg-red-500
    h-full
    relative
    overflow-hidden 
    flex
    flex-col
  `}

  border-radius : 0.5%;
`;
