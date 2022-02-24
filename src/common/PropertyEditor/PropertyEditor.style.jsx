import tw, { styled } from 'twin.macro';

export const PropertyEditorWrapper = styled.div`
  ${tw`
    w-full
    flex 
    justify-between
  `}
`;

export const Label = styled.div`
  ${tw`
    capitalize
  `}
`;

export const Controllers = styled.div`
  ${tw`
    flex
    items-center
    gap-x-3
  `}
`;
