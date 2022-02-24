import React from 'react';
import {
  SidebarWrapper,
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from './Sidebar.style';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Tabs>
        <TabList>
          <Tab>Basic</Tab>
          <Tab>Images</Tab>
          <Tab>Colors</Tab>
          <Tab>Export</Tab>
        </TabList>

        <TabPanel>
          Panel 1
        </TabPanel>
        <TabPanel>
          Panel 2
        </TabPanel>
        <TabPanel>
          Panel 3
        </TabPanel>
        <TabPanel>
          Panel 4
        </TabPanel>
      </Tabs>
    </SidebarWrapper>
  );
};

export default Sidebar;
