import tw, { styled } from 'twin.macro';
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
  Tabs as UnstyledTabs,
  TabPanel as UnstyledTabPanel,
} from 'react-tabs';

export const SidebarWrapper = styled.div`
  ${tw`
    w-full
    md:max-w-[370px]
    md:min-w-[370px]
    h-screen 
    bg-primary
    text-white
  `}
`;

export const Tabs = styled(UnstyledTabs)`
  ${tw`
    h-full
    flex 
    justify-between
    flex-col
  `}
`;

export const TabList = styled(UnstyledTabList)`
  ${tw`
    flex 
    justify-between 
    py-2 
    px-4 
  `}
`;

export const Tab = styled(UnstyledTab).attrs({
  selectedClassName: 'selected',
  disabledClassName: 'disabled',
})`
  ${tw`
    flex 
    flex-col 
    justify-center 
    items-center
    text-center 
    cursor-pointer 
    border-b-2
    border-b-transparent
    pt-2
    pb-1
    px-1
  `}
  transition: color ease-in-out 200ms, border-bottom-color ease-in-out 250ms ;

  svg{
    ${tw`text-xl mb-2`}
  }

  &.selected {
    ${tw`text-accent border-b-accent`}
  }
`;

export const TabPanel = styled(UnstyledTabPanel).attrs({ selectedClassName: 'selected' })`
  ${tw`
    hidden 
  `}

  &.selected {
    ${tw`  
      relative
      flex 
      flex-col 
      h-full 
    `}
  }
`;

Tab.tabsRole = 'Tab';
Tabs.tabsRole = 'Tabs';
TabPanel.tabsRole = 'TabPanel';
TabList.tabsRole = 'TabList';
