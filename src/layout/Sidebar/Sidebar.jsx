import React from 'react';
import {
  SidebarWrapper,
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from './Sidebar.style';
import Basic from '../../panel/Basic/Basic';
import Export from '../../panel/Export/Export';
import Colors from '../../panel/Colors/Colors';
import Images from '../../panel/Images/Images';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab>Basic</Tab>
          <Tab>Images</Tab>
          <Tab>Colors</Tab>
          <Tab>Export</Tab>
        </TabList>

        <TabPanel>
          <Basic />
        </TabPanel>
        <TabPanel>
          <Images />
        </TabPanel>
        <TabPanel>
          <Colors />
        </TabPanel>
        <TabPanel>
          <Export />
        </TabPanel>
      </Tabs>
    </SidebarWrapper>
  );
};

export default Sidebar;
