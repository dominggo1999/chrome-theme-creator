import tw, { styled } from 'twin.macro';

export const StyledButton = styled.button`
  ${tw`
    text-primary
    bg-accent
    rounded-lg
    w-full
    py-2
    font-semibold
    hover:bg-accent-lighter
  `}

  &:disabled{
    ${tw`
      cursor-not-allowed
    `}
  }
`;
