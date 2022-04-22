import React from 'react';
import { ExportWrapper } from './Export.style';
import { PanelWrapper } from '../../common/PanelWrapper';
import ExportButton from '../../common/ExportButton/ExportButton';
import ExportMessage from '../../common/ExportMessage/ExportMessage';

const Export = () => {
  return (
    <PanelWrapper>
      <ExportWrapper>
        <ExportMessage />
        <ExportButton>Export and Download</ExportButton>
      </ExportWrapper>
    </PanelWrapper>
  );
};

export default Export;
