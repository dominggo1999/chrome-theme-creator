import tw, { styled } from 'twin.macro';

export const PreviewWrapper = styled.div`
  ${tw`
    px-2
    py-2
    h-full
    w-[calc(100% - 1rem)]
    md:w-[calc(100% - 370px - 24px)]
  `}
`;

export const ChromePreviewWrapper = styled.div`
  ${tw`
    w-full
  `}
`;
