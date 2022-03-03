import React from 'react';
import { FcOpenedFolder } from 'react-icons/fc';
import { BookmarkWrapper, BookmarkItem } from './Bookmark.style';
import { useSelectorImagesColor, useSelectorColorOnly, useSelectorImageValue } from '../../../hooks/useSelectorColor';

const Bookmark = () => {
  const toolbarColor = useSelectorImagesColor('toolbar');
  const bookmarkTextColor = useSelectorColorOnly('bookmark_text');
  const toolbarBackgroundImage = useSelectorImageValue('toolbar');

  const color = bookmarkTextColor;
  const backgroundColor = toolbarBackgroundImage ? 'transparent' : toolbarColor;

  return (
    <BookmarkWrapper
      style={{
        backgroundColor,
        color,
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
