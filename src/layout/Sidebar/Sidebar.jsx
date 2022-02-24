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
import Palette from '../../common/Palette/Palette';
import ColorPicker from '../../common/ColorPicker/ColorPicker';
import ImagePicker from '../../common/ImagePicker/ImagePicker';
import Colors from '../../panel/Colors/Colors';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Tabs defaultIndex={2}>
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
          <Palette />
          <ColorPicker />
          <ImagePicker />
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
