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

export const DividerBelowTab = styled.div`
  ${tw`
    w-full
    h-[6px]
    bg-green-400
    relative
    z-[99999]
  `}
`;

export const ToolbarBackgroundImage = styled.div`
  ${tw`
    absolute
    -top-1 
    -left-1
    -right-1
    bottom-0
    z-[8000]
  `}
`;

export const TopSection = styled.div`
  ${tw`
    overflow-hidden
    flex 
    flex-col
    w-full
    relative
  `}
`;
