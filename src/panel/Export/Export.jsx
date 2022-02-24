import React from 'react';
import Button from '../../common/Button/Button';
import { ExportWrapper } from './Export.style';
import { OptionDescription } from '../Basic/Basic.style';
import { PanelWrapper } from '../../common/PanelWrapper';

const Export = () => {
  return (
    <PanelWrapper>
      <ExportWrapper>
        <OptionDescription>
          Export and download your theme as a <span>.zip </span>  file. Check out how to install <a href="#">here</a>
        </OptionDescription>
        <Button>Export and Download</Button>
      </ExportWrapper>
    </PanelWrapper>
  );
};

export default Export;
