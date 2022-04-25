import React from 'react';
import { ContentWrapper, ScrollPaddingTop } from './DocumentationContent.style';
import Documentation from '../../docs/Documentation.mdx';
import { H1 } from '../../common/MarkdownMapping';

const DocumentationContent = () => {
  return (
    <ContentWrapper>
      <ScrollPaddingTop />
      <Documentation components={{ h1: H1 }} />
    </ContentWrapper>
  );
};

export default DocumentationContent;
