import React, { useState, useEffect } from 'react';
import DocumentationSidebar from '../../layout/DocumentationSidebar/DocumentationSidebar';
import DocumentationHeader from '../../layout/DocumentationHeader/DocumentationHeader';
import DocumentationContent from '../../layout/DocumentationContent/DocumentationContent';
import { DocumentationWrapper } from './Documentation.style';
import { breakpoints } from '../../constants/breakpoints';

const Documentation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  const openSidebar = () => setSidebarOpen(true);

  useEffect(() => {
    const closeNavigation = () => {
      if(window.innerWidth >= breakpoints.md) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', closeNavigation);

    closeNavigation();
    return () => {
      window.removeEventListener('resize', closeNavigation);
    };
  }, []);

  return (
    <>
      <DocumentationHeader
        sidebarOpen={sidebarOpen}
        openSidebar={openSidebar}
      />
      <DocumentationWrapper>
        <DocumentationSidebar
          sidebarOpen={sidebarOpen}
          closeSidebar={closeSidebar}
        />
        <DocumentationContent />
      </DocumentationWrapper>
    </>
  );
};

export default Documentation;
