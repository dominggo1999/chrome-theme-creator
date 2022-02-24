import tw, { styled } from 'twin.macro';

export const TablistWrapper = styled.div`
  ${tw`
    flex
    pt-2
    px-2
    bg-indigo-500
    relative
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
    bg-[red]
    left-full
    z-50
    rounded-[8px]
    bg-[#E7EAED]
    bottom-0
  `}

  box-shadow : -5px 5px 0 #34D399;
`;

export const TabOneCurveLeft = styled.div`
  ${tw`
    absolute
    w-[10px]
    h-[10px] 
    bg-[red]
    right-full
    z-50
    rounded-[8px]
    bg-[#6366F1]
    bottom-0
  `}

  box-shadow : 5px 5px 0 #34D399;
`;

export const TabTwoCurveRight = styled.div`
  ${tw`
     absolute
      w-[10px]
      h-[10px] 
      bg-[red]
      left-full
      z-50
      rounded-[8px]
      bg-[#6366F1]
      bottom-0
    `}

    box-shadow : -5px 5px 0 #E7EAED;
`;

export const ActiveTab = styled(TabItem)`
  ${tw`
    bg-green-400
  `}
`;

export const BackgroundTab = styled(TabItem)`
  ${tw`
    bg-[#E7EAED]
  `}
`;

export const DividerBlowTab = styled.div`
  ${tw`
    w-full
    h-[6px]
    bg-green-400
    relative
    z-[90]
  `}
`;
