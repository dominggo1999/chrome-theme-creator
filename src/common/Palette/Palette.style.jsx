import tw, { styled } from 'twin.macro';

export const PaletteWrapper = styled.div`
  ${tw`
    relative
  `}

  width : 20px;
`;

export const Icon = styled.button`
  ${tw`
    inline-flex
    w-full
  `}

  svg{
    ${tw`
      text-2xl
    `}
  }
`;

export const ColorPicker = styled.div`
  ${tw`
    absolute
    left-0 
    top-full
    bg-white
    ml-4
    rounded-sm
    grid
    grid-cols-3 
    p-3
    gap-4
  `}
  width : 100px;
`;

export const ColorOption = styled.div`
  ${tw`
      w-[20px] 
      h-[20px]
      cursor-pointer
    `}
    transition : transform ease-in-out 200ms;

    &:hover{
      transform : scale(1.2);
    }
`;
