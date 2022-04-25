import tw, { styled } from 'twin.macro';

export const SidebarWrapper = styled.div`
  ${tw`
    -translate-x-full 
    md:translate-x-0 
    md:block
    w-52
    xl:w-60
    h-screen 
    overflow-y-auto    
    fixed  
    bg-primary 
  `}
  transition: transform .25s ease;
`;

export const Navigation = styled.div`
  ${tw`
    flex  
    flex-col 
    h-full 
  `}
  /* Give padding for nested ul */
  ul{
    ${tw`
      flex 
      flex-col 
      gap-y-4
    `}
  }

  a{
    ${tw`
      inline-block
    `}
  }

  a.link-active{
    ${tw`
      text-accent
    `}
  }
`;
