import React from 'react';
import {
  StyledFrame, ToolbarBackgroundImage, TopSection, DividerBelowTab,
} from './Frame.style';
import Toolbar from '../Toolbar/Toolbar';
import Tablist from '../Tablist/Tablist';
import SearchBar from '../SearchBar/SearchBar';
import Bookmark from '../Bookmark/Bookmark';
import NewTabPage from '../NewTabPage/NewTabPage';
import { useSelectorImagesColor, useSelectorImageValue } from '../../../hooks/useSelectorColor';

const Frame = () => {
  const frameBacgroundColor = useSelectorImagesColor('frame');
  const toolbarBackgroundImage = useSelectorImageValue('toolbar');
  const toolbarColor = useSelectorImagesColor('toolbar');
  const frameBackgroundImage = useSelectorImageValue('frame');

  return (
    <StyledFrame
      id="frame"
      style={{
        backgroundColor: frameBacgroundColor,
        backgroundImage: frameBackgroundImage ? `url("${frameBackgroundImage}")` : null,
      }}
    >

      <TopSection>
        {toolbarBackgroundImage && (
          <ToolbarBackgroundImage
            style={{
              backgroundImage: `url("${toolbarBackgroundImage}")`,
            }}
          />
        )}
        <Tablist />
        <DividerBelowTab
          style={{
            backgroundColor: toolbarBackgroundImage ? 'transparent' : toolbarColor,
          }}
        />
        <SearchBar />
        <Bookmark />
      </TopSection>

      <Toolbar />
      <NewTabPage />
    </StyledFrame>
  );
};

export default Frame;
