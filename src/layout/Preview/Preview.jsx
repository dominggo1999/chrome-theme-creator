import React, { useLayoutEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { PreviewWrapper, ChromePreviewWrapper } from './Preview.style';
import Frame from '../ChromeWindow/Frame/Frame';

const Preview = () => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [scale, setScale] = useState(1);
  const chromeRef = useRef();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const getScale = () => {
      const h = isMobile ? 900 : window.screen.availHeight;
      const w = isMobile ? 1600 : window.screen.availWidth;
      const newAspectRatio = w / h;
      const { width: previewWidth } = (chromeRef.current.getBoundingClientRect());

      chromeRef.current.style.height = `${previewWidth / aspectRatio}px`;

      setWidth(w);
      setAspectRatio(newAspectRatio);
      setScale(previewWidth / w);
    };

    window.addEventListener('resize', getScale);

    getScale();

    return () => {
      window.removeEventListener('resize', getScale);
    };
  }, []);

  console.log(width);

  if(!scale) return null;

  return (
    <PreviewWrapper ref={chromeRef}>
      <ChromePreviewWrapper
        style={{
          width,
          aspectRatio: `${aspectRatio}`,
          transform: `scale(${scale})`,
          transformOrigin: '0px 0px',
        }}
      >
        <Frame />
      </ChromePreviewWrapper>
    </PreviewWrapper>
  );
};

export default Preview;
