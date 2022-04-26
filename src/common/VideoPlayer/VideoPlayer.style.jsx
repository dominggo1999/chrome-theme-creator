import tw, { styled } from 'twin.macro';

export const VideoWrapper = styled.div`
  ${tw`
    w-full
    relative 
    mt-4 
    mb-6 
    pt-[56.25%] 
  `}

  .player {
    ${tw`
      bg-[#202124] 
      absolute 
      top-0 
      left-0 
    `}

    width: 100%!important;
    height: 100%!important;
  }
`;
