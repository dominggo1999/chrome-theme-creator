import tw, { styled } from 'twin.macro';

export const PreviewWrapper = styled.div`
  ${tw`
    px-2
    py-2
    h-full
  `}

  width : calc(100% - 400px - 8px);
`;

export const ChromePreviewWrapper = styled.div`
  ${tw`
    w-full
  `}
`;
