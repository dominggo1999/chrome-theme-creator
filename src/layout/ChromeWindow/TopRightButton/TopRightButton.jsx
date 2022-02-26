import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { MdOutlineMinimize } from 'react-icons/md';
import { VscChromeRestore } from 'react-icons/vsc';
import fontColorContrast from 'font-color-contrast';
import {
  ButtonWrapper,
  Actions,
  Left,
  Right,
} from './TopRightButton.style';
import { useSelectorColorOnly } from '../../../hooks/useSelectorColor';

const TopRightButton = () => {
  const buttonBackground = useSelectorColorOnly('button_background');

  return (
    <ButtonWrapper
      style={{
        background: buttonBackground,
      }}
    >
      <Actions
        style={{
          color: fontColorContrast(buttonBackground),
        }}
      >
        <Left>
          <span>
            <MdOutlineMinimize />
          </span>
          <span>
            <VscChromeRestore />
          </span>
        </Left>
        <Right>
          <IoIosClose />
        </Right>
      </Actions>
    </ButtonWrapper>
  );
};

export default TopRightButton;
