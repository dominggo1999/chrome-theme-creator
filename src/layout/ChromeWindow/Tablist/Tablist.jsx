import React from 'react';
import { IoIosClose, IoIosAdd } from 'react-icons/io';
import fontColorContrast from 'font-color-contrast';
import {
  TablistWrapper,
  DividerBlowTab,
  ActiveTab,
  BackgroundTab,
  TabOneCurveRight,
  TabOneCurveLeft,
  TabTwoCurveRight,
  AddTabButton,
} from './Tablist.style';
import TopRightButton from '../TopRightButton/TopRightButton';
import { useSelectorImagesColor, useSelectorColorOnly } from '../../../hooks/useSelectorColor';

const Tablist = () => {
  const frameBackgroundColor = useSelectorImagesColor('frame');
  const inactiveTabBackground = useSelectorImagesColor('inactive_tab');

  const toolbarColor = useSelectorImagesColor('toolbar');
  const activeTabTextColor = useSelectorColorOnly('active_tab_text');
  const inactiveTabTextColor = useSelectorColorOnly('inactive_tab_text');

  return (
    <>
      <TablistWrapper
        style={{
          backgroundColor: frameBackgroundColor,
        }}
      >
        <TopRightButton />
        <ActiveTab
          style={{
            backgroundColor: toolbarColor,
            color: activeTabTextColor,
          }}
        >
          <TabOneCurveLeft
            style={{
              backgroundColor: frameBackgroundColor, boxShadow: `5px 5px 0 ${toolbarColor}`,
            }}
          />
          <span>
            Google
          </span>
          <IoIosClose />
          <TabOneCurveRight
            style={{
              backgroundColor: inactiveTabBackground,
              boxShadow: `-5px 5px 0 ${toolbarColor}`,
            }}
          />
        </ActiveTab>
        <BackgroundTab
          style={{
            backgroundColor: inactiveTabBackground,
            color: inactiveTabTextColor,
          }}
        >
          <span>
            Chrome
          </span>
          <IoIosClose />
          <TabTwoCurveRight
            style={{
              backgroundColor: frameBackgroundColor,
              boxShadow: `-5px 5px 0 ${inactiveTabBackground}`,
            }}
          />
        </BackgroundTab>
        <AddTabButton
          style={{
            color: fontColorContrast(frameBackgroundColor),
          }}
        >
          <IoIosAdd />
        </AddTabButton>
      </TablistWrapper>
      <DividerBlowTab
        style={{
          backgroundColor: toolbarColor,
        }}
      />
    </>
  );
};

export default Tablist;
