import tw, { styled } from 'twin.macro';

export const PageWrapper = styled.div`
  ${tw`
    w-full
    h-full
    flex
    bg-indigo-100
  `}
`;

export const SearchBoxWrapper = styled.div`
  ${tw`
    h-full
    flex
    flex-col
    w-[561px]
    mx-auto
  `}
`;

export const GoogleLogo = styled.div`
  ${tw`
    mt-[7.2rem]
    mx-auto
    mb-[38px]
  `}

  height: 92px;
  width: 272px;
  background-image: url("./google_logo.svg");
`;

export const SearchBox = styled.div`
  ${tw`
    w-full
    bg-white
    rounded-full
    flex
    items-center
    relative
  `}

  div{
    ${tw`
      absolute
      flex
      items-center
    `}
  }

  div:nth-child(1){
    ${tw`
      h-full
      w-[32px]
    `}

    background-image : url("./search.svg");
    background-repeat : no-repeat;
    background-position : center;
    height: 100%;
    left: 12px;
  }

  div:nth-child(3){
    ${tw`
      h-full
      w-[32px]
    `}

    background-image : url("./googlemic_clr_24px.svg");
    background-repeat : no-repeat;
    background-position : center;
    height: 100%;
    right: 12px;
  }

  padding-inline-end: 44px;
  padding-inline-start: 52px;
  height:44px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
  margin-bottom: 16px;
`;

export const NtpItemsWrapper = styled.div`
  ${tw`
    flex 
    w-full
  `}
`;

export const NtpItem = styled.div`
  ${tw`
    w-1/5 
    flex
    flex-col
    items-center
    justify-center
  `}

  aspect-ratio : 1;


  span{
    ${tw`
      h-[50px]
      flex
      items-center
      rounded-full
      justify-center
      bg-[#A9ABB7]
    `}
    aspect-ratio : 1;
    background-color : #a9abb739; 
  }

  span svg{
    font-size : 30px;
  }

  p{
    ${tw`
      text-sm
      mt-4
    `}
  }
`;
