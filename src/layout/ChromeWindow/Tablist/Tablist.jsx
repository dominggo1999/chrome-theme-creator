import React from 'react';
import { IoIosClose, IoIosAdd } from 'react-icons/io';
import fontColorContrast from 'font-color-contrast';
import {
  TablistWrapper,
  TablistWrapperMask,
  ActiveTab,
  ActiveTabMaskWrapper,
  BackgroundTab,
  BackgroundTabMaskWrapper,
  TabOneCurveRight,
  TabOneCurveLeft,
  TabTwoCurveRight,
  AddTabButton,
} from './Tablist.style';
import TopRightButton from '../TopRightButton/TopRightButton';
import { useSelectorImagesColor, useSelectorColorOnly, useSelectorImageValue } from '../../../hooks/useSelectorColor';

const Tablist = () => {
  const frameBackgroundColor = useSelectorImagesColor('frame');
  const inactiveTabBackground = useSelectorImagesColor('tab_background');
  const toolbarColor = useSelectorImagesColor('toolbar');

  const activeTabTextColor = useSelectorColorOnly('tab_text');
  const inactiveTabTextColor = useSelectorColorOnly('tab_background_text');

  const toolbarBackgroundImage = useSelectorImageValue('toolbar');
  const frameBackgroundImage = useSelectorImageValue('frame');
  const backgroundTabImage = useSelectorImageValue('tab_background');

  return (
    <>
      <TablistWrapper>
        <TablistWrapperMask
          style={{
            backgroundImage: frameBackgroundImage ? `url("${frameBackgroundImage}")` : null,
            backgroundColor: frameBackgroundImage ? 'transparent' : frameBackgroundColor,
          }}
        />

        <TopRightButton />
        <ActiveTab
          style={{
            backgroundColor: toolbarBackgroundImage ? 'transparent' : toolbarColor,
            color: activeTabTextColor,
            overflow: toolbarBackgroundImage ? 'hidden' : null,
          }}
        >
          <ActiveTabMaskWrapper
            style={{
              backgroundImage: toolbarBackgroundImage ? `url("${toolbarBackgroundImage}")` : null,
              backgroundColor: toolbarBackgroundImage ? 'transparent' : toolbarBackgroundImage,
            }}
          />
          <TabOneCurveLeft
            style={{
              backgroundColor: 'transparent',
              boxShadow: `5px 5px 0 ${toolbarBackgroundImage ? 'transparent' : toolbarColor}`,
            }}
          />
          <span>
            Google
          </span>
          <IoIosClose />
          <TabOneCurveRight
            style={{
              backgroundColor: inactiveTabBackground,
              boxShadow: toolbarBackgroundImage ? 'none' : `-5px 5px 0 ${toolbarColor}`,
            }}
          />
        </ActiveTab>
        <BackgroundTab
          style={{
            backgroundColor: inactiveTabBackground,
            color: inactiveTabTextColor,
            overflow: backgroundTabImage ? 'hidden' : null,
          }}
        >
          <BackgroundTabMaskWrapper
            style={{
              backgroundImage: backgroundTabImage ? `url("${backgroundTabImage}")` : null,
              backgroundColor: backgroundTabImage ? 'transparent' : backgroundTabImage,
            }}
          />
          <span>
            Chrome
          </span>
          <IoIosClose />
          <TabTwoCurveRight
            style={{
              backgroundColor: 'transparent',
              boxShadow: toolbarBackgroundImage ? null : `-5px 5px 0 ${inactiveTabBackground}`,
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
    </>
  );
};

export default Tablist;
