import React from 'react';
import { StyledFrame } from './Frame.style';
import Toolbar from '../Toolbar/Toolbar';
import Tablist from '../Tablist/Tablist';
import SearchBar from '../SearchBar/SearchBar';
import Bookmark from '../Bookmark/Bookmark';
import NewTabPage from '../NewTabPage/NewTabPage';

const Frame = () => {
  return (
    <StyledFrame>
      <Tablist />
      <Toolbar />
      <SearchBar />
      <Bookmark />
      <NewTabPage />
    </StyledFrame>
  );
};

export default Frame;
