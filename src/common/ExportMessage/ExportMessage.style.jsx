import tw, { styled } from 'twin.macro';

export const MessageDescription = styled.div`
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
