import tw, { styled } from 'twin.macro';

export const SidebarWrapper = styled.div`
  ${tw`
    -translate-x-full 
    md:translate-x-0 
    md:block
    w-52
    xl:w-60
    overflow-y-auto    
    fixed  
    bg-primary  
    z-[99999]  
    top-16 
    bottom-0 
  `}

  ${({ open }) => open && tw`translate-x-0 `}
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
      h-full
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

export const Copyright = styled.li`
  ${tw`
    mt-auto 
    text-sm 
    py-2
  `}

  a{
    ${tw`
      text-accent 
      font-semibold
    `}
  }
`;
