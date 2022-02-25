import tw, { styled } from 'twin.macro';

export const SearchBarWrapper = styled.div`
  ${tw`
    w-full 
    flex
    h-[38px]
    bg-[#34D399]
    px-1
  `}
`;

export const Navigation = styled.div`
  ${tw`
    flex
    gap-1
    mr-2
  `}


  span {
    ${tw`
      w-[30px]
      h-full
      flex
      items-center
      justify-center
      text-xl
    `}
  }
`;

export const Omnibox = styled.div`
  ${tw`
    w-full
    h-full
    relative
    bg-[#E1E1E2]
    rounded-full
    px-3
    flex
    items-center
    justify-between
    text-black
  `}

  span{
    svg{
      ${tw`
        text-xl
      `}
    }
  }
`;

export const OmniboxLeft = styled.div`
  ${tw`
    flex 
    items-center
  `}

  span{
    ${tw`
      mr-2
      flex
      items-center
    `}
  }
`;
