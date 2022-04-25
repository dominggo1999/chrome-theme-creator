import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import {
  Header, Brand, HeaderWrapper, PreviousButton, ArrowWrapper,
} from './DocumentationHeader.style';

const DocumentationHeader = () => {
  return (
    <Header>
      <HeaderWrapper>
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
