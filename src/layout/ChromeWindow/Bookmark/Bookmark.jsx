import React from 'react';
import { FcOpenedFolder } from 'react-icons/fc';
import { BookmarkWrapper, BookmarkItem } from './Bookmark.style';

const Bookmark = () => {
  return (
    <BookmarkWrapper>
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
