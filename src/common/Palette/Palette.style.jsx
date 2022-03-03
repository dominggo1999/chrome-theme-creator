import tw, { styled } from 'twin.macro';

export const PaletteWrapper = styled.div`
  ${tw`
    relative
    flex
    items-center
    justify-center
  `}

  width : 20px;
`;

export const Icon = styled.button`
  ${tw`
    inline-flex
  `}

  svg{
    ${tw`
      text-2xl
      text-accent
    `}
  }
`;

export const ColorPicker = styled.div`
  ${tw`
    z-[90]
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

    &:hover, &:active{
      transform : scale(1.2);
    }
`;

export const NoPalette = styled(ColorPicker)`
  ${tw`
    text-primary
    text-sm
    text-primary
    right-0
    left-auto
    flex
  `}

  width : 150px;
`;
