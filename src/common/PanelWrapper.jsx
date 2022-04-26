import tw, { styled } from 'twin.macro';

export const PanelWrapper = styled.div`
  ${tw`
    py-4
    px-4
    flex
    flex-col
    bg-primary 
  `}

  ${({ noPadding }) => noPadding && tw`px-0`}
`;
