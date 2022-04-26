import tw, { styled } from 'twin.macro';

export const AppContainer = styled.div`
  ${tw`
    flex 
    flex-col-reverse
    md:flex-row
    w-full 
    bg-primary
  `}
`;

export const CapsuleWrapper = styled.div`
  ${tw`
    w-full 
    h-full 
    bg-primary
    absolute 
    top-0  
    left-0 
  `}
  z-index: -1;
`;

export const Capsule = styled.div`
  ${tw`
    w-full 
    h-full 
    relative 
    overflow-hidden
  `}
`;
