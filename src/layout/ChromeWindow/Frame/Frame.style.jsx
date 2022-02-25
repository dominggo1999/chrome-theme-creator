import tw, { styled } from 'twin.macro';

export const StyledFrame = styled.div`
  ${tw`
    h-full
    relative
    overflow-hidden 
    flex
    flex-col
    p-1
    select-none
  `}

  border-radius : 0.5%;
`;
