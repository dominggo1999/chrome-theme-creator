import tw, { styled } from 'twin.macro';

export const ImagePickerWrapper = styled.div`
  ${tw`
    flex
    relative
  `}

  /* File picker */
  div{
    ${tw`
      flex
      justify-between
      items-center
    `}
  }
`;

export const OpenPickerButton = styled.button`
  ${tw`
    w-[110px] 
    bg-accent
    text-primary
    rounded-lg
    text-sm
    px-2
    py-1
    relative
    overflow-hidden
  `}
`;

export const HandleResult = styled(OpenPickerButton)`
  ${tw`
    flex
    items-center
    cursor-auto
  `}

  span{
    ${tw`
      absolute
      right-0
      h-full
      flex
      items-center
      justify-center
      w-[30px]
      cursor-pointer
    `}
  }

  span:hover{
    ${tw`
      bg-accent-lighter
    `}
  }
`;

export const SuccessResult = styled(HandleResult)`
  ${tw`
    text-left
    bg-accent
    text-primary
  `}
`;

export const ErrorResult = styled(HandleResult)`
  ${tw`
    text-left
    bg-danger
    text-primary
  `}

  span:hover{
    ${tw`
      bg-danger-lighter
    `}
  }
`;
