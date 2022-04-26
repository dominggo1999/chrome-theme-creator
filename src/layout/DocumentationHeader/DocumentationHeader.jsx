import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import {
  Header, Brand, HeaderWrapper, PreviousButton, ArrowWrapper, MenuIcon,
} from './DocumentationHeader.style';

const DocumentationHeader = ({ sidebarOpen, openSidebar }) => {
  return (
    <Header>
      <HeaderWrapper>
        <MenuIcon onClick={openSidebar}>
          {
            sidebarOpen
              ? <AiOutlineClose />
              : <AiOutlineMenu />
          }
        </MenuIcon>
        <Brand>
          Chrome Themer
        </Brand>
        <PreviousButton to="/">
          <ArrowWrapper>
            <BiArrowBack />
          </ArrowWrapper>
          Back to editor
        </PreviousButton>
      </HeaderWrapper>
    </Header>
  );
};

export default DocumentationHeader;
