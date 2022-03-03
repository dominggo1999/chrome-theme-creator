import tw, { styled } from 'twin.macro';

export const SettingsWrapper = styled.div`
  ${tw`
    flex
    flex-col
    py-2
  `}
`;

export const SettingsHeader = styled.div`
  ${tw`
    text-lg
    text-accent
    font-semibold
    mb-2
  `}
`;

export const OptionsWrapper = styled.div`
  ${tw`
    flex
    justify-between
    mb-3
  `}
`;
