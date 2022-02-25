import React from 'react';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { MdRefresh } from 'react-icons/md';
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineStar } from 'react-icons/ai';
import {
  SearchBarWrapper, Navigation, Omnibox, OmniboxLeft,
} from './SearchBar.style';
import { useSelectorImagesColor, useSelectorColorOnly } from '../../../hooks/useSelectorColor';

const SearchBar = () => {
  const toolbarColor = useSelectorImagesColor('toolbar');
  const navigationColor = useSelectorColorOnly('navigation');

  return (
    <SearchBarWrapper
      style={{
        backgroundColor: toolbarColor,
      }}
    >
      <Navigation
        style={{
          color: navigationColor,
        }}
      >
        <span>
          <IoMdArrowBack />
        </span>
        <span>
          <IoMdArrowForward />
        </span>
        <span>
          <MdRefresh />
        </span>
      </Navigation>
      <Omnibox>
        <OmniboxLeft>
          <span>
            <BiSearchAlt2 />
          </span>
          <p>
            https://www.google.com/
          </p>
        </OmniboxLeft>
        <span>
          <AiOutlineStar />
        </span>
      </Omnibox>
    </SearchBarWrapper>

  );
};

export default SearchBar;
