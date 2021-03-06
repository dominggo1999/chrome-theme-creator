import tw, { styled } from 'twin.macro';
import { createGlobalStyle } from 'styled-components';

export const ScrollPaddingTop = createGlobalStyle`
  html {
    scroll-padding-top: 64px; /* height of sticky header */
  }
`;

export const ContentWrapper = styled.div`
  ${tw`
    mt-16
    md:pl-56
    xl:pl-64
    bottom-0 
    max-w-[64rem]
    md:pr-4
    w-full
    mx-auto  
    flex 
    flex-col 
  `}
  
  h1{
    ${tw`
      text-2xl
      md:text-3xl
      mb-5 
      font-medium 
      flex 
      gap-x-2 
      items-start
      text-accent
    `}
  }

  p{
    ${tw`
      mb-5
    `}
  }

  a{
    ${tw`
      text-accent
      font-semibold
    `}
  }

  ol{
    ${tw`
      list-decimal 
      mb-5 
      flex
      flex-col 
      gap-y-2
    `}

    li{
      ${tw`
        ml-4
      `}
    }
  }
`;
