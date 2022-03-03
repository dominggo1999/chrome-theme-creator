import tw, { styled } from 'twin.macro';

export const TablistWrapper = styled.div`
  ${tw`
    flex
    pt-2
    px-2
    relative
  `}
`;

export const TablistWrapperMask = styled.div`
  ${tw`
    absolute
    -left-1
    -right-1
    -top-1
    bottom-0
    z-[9999]
  `}
`;

export const TabItem = styled.div`
  ${tw`
    flex
    justify-between
    items-center
    w-[240px]
    h-[30px] 
    px-[10px]
    py-[8px]
    text-sm
    rounded-t-[8px]
    relative
  `}

  span, svg{
    ${tw`
      relative
      z-[999999]
    `}
  }

  svg{
    ${tw`
      text-xl
    `}
  }
`;

export const AddTabButton = styled.div`
  ${tw`
    w-[40px]
    h-[30px] 
    flex
    items-center 
    justify-center
    text-sm
    pb-[1px]
    relative
    z-[9999]
  `}

  svg{
    ${tw`
      text-xl
    `}
  }
`;

export const TabOneCurveRight = styled.div`
  ${tw`
    absolute
    w-[10px]
    h-[10px] 
    left-full
    z-[11000]
    rounded-[8px]
    bottom-0
  `}
`;

export const TabOneCurveLeft = styled.div`
  ${tw`
    absolute
    w-[10px]
    h-[10px] 
    right-full
    z-50
    rounded-[8px]
    bottom-0
  `}
`;

export const TabTwoCurveRight = styled.div`
  ${tw`
     absolute
      w-[10px]
      h-[10px] 
      left-full
      rounded-[8px]
      bottom-0
      z-[10]
    `}
`;

export const ActiveTab = styled(TabItem)`
  ${tw`
    relative
    z-[11000]
  `}
`;

export const ActiveTabMaskWrapper = styled.div`
  ${tw`
    absolute
    z-[1100]
    -left-3
    -top-3
    right-0
    bottom-0
  `}
`;

export const BackgroundTab = styled(TabItem)`
  ${tw`
    z-[10000]
  `}
`;

export const BackgroundTabMaskWrapper = styled.div`
  ${tw`
    absolute
    z-[1100]
    -top-3
    w-screen
    bottom-0
  `}

  left : calc(-100% - 0.75rem);
`;
