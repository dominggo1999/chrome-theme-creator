import tw, { styled } from 'twin.macro';

export const BookmarkWrapper = styled.div`
  ${tw`
    flex
    w-full
    bg-[#34D399]
    h-[38px]
    items-center
    px-1
  `}
`;

export const BookmarkItem = styled.div`
  ${tw`
    flex 
    items-center
  `}

  span{
    ${tw`
      mr-2
    `}
    svg{
      ${tw`
        text-xl
      `}
    }
  }

  p{
      ${tw`
        text-sm
      `}
    }
`;
