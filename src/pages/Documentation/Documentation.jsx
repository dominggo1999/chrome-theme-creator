import React from 'react';
import DocumentationSidebar from '../../layout/DocumentationSidebar/DocumentationSidebar';
import DocumentationHeader from '../../layout/DocumentationHeader/DocumentationHeader';
import DocumentationContent from '../../layout/DocumentationContent/DocumentationContent';
import { DocumentationWrapper } from './Documentation.style';

const Documentation = () => {
  return (
    <>
      <DocumentationHeader />
      <DocumentationWrapper>
        <DocumentationSidebar />
        <DocumentationContent />
      </DocumentationWrapper>
    </>
  );
};

export default Documentation;
