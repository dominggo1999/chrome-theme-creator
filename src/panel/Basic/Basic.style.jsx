import tw, { styled } from 'twin.macro';

export const Options = styled.ul`
  ${tw`
    w-full 
    flex
    flex-col
    gap-y-6
  `}
`;

export const OptionItem = styled.li`
  ${tw`
    
  `}
`;

export const OptionTitle = styled.div`
  ${tw`
    text-xl
    text-accent
    font-semibold
    mb-1
  `}
`;

export const OptionDescription = styled.p`
  ${tw`
    text-sm
    mb-2
  `}

  span,a {
    ${tw`
      text-accent
    `}
  }
`;

export const UploadResult = styled.div`
  ${tw`
    mt-2
    text-danger
    text-sm
  `}
`;

export const ErrorMessage = styled(UploadResult)`
  ${tw`
    text-danger
  `}
`;

export const FileName = styled(UploadResult)`
  ${tw`
    text-accent
    truncate
    max-w-[90%]
  `}
`;
