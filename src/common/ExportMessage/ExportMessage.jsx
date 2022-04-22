import React from 'react';
import { MessageDescription } from './ExportMessage.style';

const ExportMessage = () => {
  return (
    <MessageDescription>
      Export and download your theme as a <span>.zip </span>  file.
      <br />
      Check out how to install <a href="#">here</a>
    </MessageDescription>
  );
};

export default ExportMessage;
