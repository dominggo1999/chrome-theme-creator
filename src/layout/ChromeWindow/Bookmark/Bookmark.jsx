import React from 'react';
import { FcOpenedFolder } from 'react-icons/fc';
import { BookmarkWrapper, BookmarkItem } from './Bookmark.style';
import { useSelectorImagesColor, useSelectorColorOnly, useSelectorImageValue } from '../../../hooks/useSelectorColor';

const Bookmark = () => {
  const toolbarColor = useSelectorImagesColor('toolbar');
  const bookmarkTextColor = useSelectorColorOnly('bookmark_text');
  const toolbarBackgroundImage = useSelectorImageValue('toolbar');

  return (
    <BookmarkWrapper
      style={{
        backgroundColor: toolbarBackgroundImage ? 'transparent' : toolbarColor,
        color: bookmarkTextColor,
      }}
    >
      <BookmarkItem>
        <span>
          <FcOpenedFolder />
        </span>
        <p>Chrome Bookmark...</p>
      </BookmarkItem>
    </BookmarkWrapper>
  );
};

export default Bookmark;
