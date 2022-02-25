import React from 'react';
import { FcOpenedFolder } from 'react-icons/fc';
import { BookmarkWrapper, BookmarkItem } from './Bookmark.style';
import { useSelectorImagesColor, useSelectorColorOnly } from '../../../hooks/useSelectorColor';

const Bookmark = () => {
  const toolbarColor = useSelectorImagesColor('toolbar');
  const bookmarkTextColor = useSelectorColorOnly('bookmark_text');

  return (
    <BookmarkWrapper
      style={{
        backgroundColor: toolbarColor,
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
