import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { MdOutlineMinimize } from 'react-icons/md';
import { VscChromeRestore } from 'react-icons/vsc';
import {
  ButtonWrapper,
  Actions,
  Left,
  Right,
} from './TopRightButton.style';

const TopRightButton = () => {
  return (
    <ButtonWrapper>
      <Actions>
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
