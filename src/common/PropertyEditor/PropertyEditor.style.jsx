import tw, { styled } from 'twin.macro';
import ImagePicker from '../ImagePicker/ImagePicker';

export const PropertyEditorWrapper = styled.div`
  ${tw`
    w-full
    flex 
    hover:bg-[#32354e]
    py-2
    px-4
    select-none
  `}
`;

export const Label = styled.div`
  ${tw`
    capitalize
    w-full
  `}
`;

export const Controllers = styled.div`
  ${tw`
    flex
    w-full
    items-center
  `}
`;

export const ControllerLeft = styled.div`
  ${tw`
    justify-self-start
  `}
`;

export const ControllerRight = styled.div`
  ${tw`
    flex
    items-center
    w-full
    justify-end
  `}

  & > div:nth-child(2){
    margin-left: ${({ colorsTab }) => (!colorsTab ? 'calc((100% - 42px) / 2)' : '0.75rem')};
  }


`;
