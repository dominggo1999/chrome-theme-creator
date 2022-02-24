import React from 'react';
import { StyledButton } from './Button.style';

const Button = ({ children, ...rest }) => {
  return (
    <StyledButton {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
