import React, { useEffect, useRef, useState } from 'react';
import { PreviewWrapper, ChromePreviewWrapper } from './Preview.style';
import Frame from '../ChromeWindow/Frame/Frame';

const Preview = () => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [scale, setScale] = useState(1);
  const chromeRef = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const getScale = () => {
      const w = window.screen.availWidth;
      const { width: previewWidth } = (chromeRef.current.getBoundingClientRect());

      setScale(previewWidth / w);
    };

    const getAspectRatio = () => {
      const h = window.screen.availHeight;
      const w = window.screen.availWidth;
      setWidth(w);

      setAspectRatio(w / h);
    };

    window.addEventListener('resize', getScale);

    getAspectRatio();
    getScale();

    return () => {
      window.removeEventListener('resize', getScale);
    };
  }, []);

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
