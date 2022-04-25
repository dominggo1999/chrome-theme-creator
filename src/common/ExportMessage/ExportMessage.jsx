import React from 'react';
import { MessageDescription } from './ExportMessage.style';
import Link from '../RouterLink';

const ExportMessage = () => {
  return (
    <MessageDescription>
      Export and download your theme as a <span>.zip </span>  file.
      <br />
      Check out how to install <Link to="/documentation">here</Link>
    </MessageDescription>
  );
};

export default ExportMessage;
