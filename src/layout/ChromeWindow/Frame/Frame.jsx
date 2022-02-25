import React from 'react';
import { StyledFrame } from './Frame.style';
import Toolbar from '../Toolbar/Toolbar';
import Tablist from '../Tablist/Tablist';
import SearchBar from '../SearchBar/SearchBar';
import Bookmark from '../Bookmark/Bookmark';
import NewTabPage from '../NewTabPage/NewTabPage';
import { useSelectorImagesColor } from '../../../hooks/useSelectorColor';

const Frame = () => {
  const frameBacgroundColor = useSelectorImagesColor('frame');

  return (
    <StyledFrame
      style={{
        backgroundColor: frameBacgroundColor,
      }}
    >
      <Tablist />
      <Toolbar />
      <SearchBar />
      <Bookmark />
      <NewTabPage />
    </StyledFrame>
  );
};

export default Frame;
