import tw, { styled } from 'twin.macro';

export const ColorPickerWrapper = styled.div`
  ${tw`
    relative 
    h-[20px]
    w-[20px]
  `}
`;

export const Icon = styled.button`
  ${tw`
    h-full
    w-full
    rounded-full
    border-2
    border-white
  `}
`;

export const PickerWrapper = styled.div`
  ${tw`
    mt-1
    absolute 
    md:left-0 
    z-[99999] 
    right-0
  `}

  ${({ repositionY }) => (repositionY ? tw`md:bottom-full` : tw`md:top-full`)}

  .react-colorful__last-control{
    ${tw`
      rounded-none
    `}
  }
`;

export const ColorInputContainer = styled.div`
  ${tw`
    py-2
    w-full
    flex
    mx-auto 
    bg-white
    justify-center
    rounded-b-[8px]
    w-[200px]
  `}

  input {
    ${tw`
      w-3/5
      border
      border-primary
      text-primary
      text-center
      text-lg
      rounded-xl
    `}
  }
`;
