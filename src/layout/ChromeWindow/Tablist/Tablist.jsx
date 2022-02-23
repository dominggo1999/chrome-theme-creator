import React from 'react';
import { IoIosClose, IoIosAdd } from 'react-icons/io';
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

const Tablist = () => {
  return (
    <>
      <TablistWrapper>
        <TopRightButton />
        <ActiveTab>
          <TabOneCurveLeft />
          <span>
            Google
          </span>
          <IoIosClose />
          <TabOneCurveRight />
        </ActiveTab>
        <BackgroundTab>
          <span>
            Chrome
          </span>
          <IoIosClose />
          <TabTwoCurveRight />
        </BackgroundTab>
        <AddTabButton>
          <IoIosAdd />
        </AddTabButton>
      </TablistWrapper>
      <DividerBlowTab></DividerBlowTab>
    </>
  );
};

export default Tablist;
