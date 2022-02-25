import tw, { styled } from 'twin.macro';

export const ButtonWrapper = styled.div`
  ${tw`
    absolute
    z-[100]
    right-0 
    top-0
    h-[30px]
    rounded-md
  `}
`;

export const Actions = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    w-[80px]
    h-full
  `}
`;

export const Left = styled.div`
  ${tw`
    w-1/2 
    flex
    items-center
    justify-between
    h-full
  `}

  span{
    ${tw`
      w-1/2
      flex 
      items-center
      justify-center
    `}

    svg{
      ${tw`
        text-lg
      `}
    }
  }
`;

export const Right = styled.div`
  ${tw`
    w-2/5
    flex
    items-center 
    justify-center
    h-full
  `}

  svg{
    ${tw`
      text-3xl
    `}
  }
`;
