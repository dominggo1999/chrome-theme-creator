import React from 'react';
import { getAnchor } from '../util/getAnchor';

export const H1 = ({ children }) => {
  const anchor = getAnchor(children);
  const link = `#${anchor}`;

  return (
    <h1
      id={anchor}
    >
      <a
        href={link}
        className="anchor-link"
      >
        #
      </a>
      {children}
    </h1>
  );
};
