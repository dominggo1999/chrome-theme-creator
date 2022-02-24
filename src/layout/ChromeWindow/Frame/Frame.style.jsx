import tw, { styled } from 'twin.macro';

export const StyledFrame = styled.div`
  ${tw`
    h-full
    relative
    overflow-hidden 
    flex
    flex-col
    bg-[#6366F1]
    px-1
    pb-1
    select-none
  `}

  border-radius : 0.5%;
`;
