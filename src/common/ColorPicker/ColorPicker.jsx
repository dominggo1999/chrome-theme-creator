import React, { useRef, useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import {
  ColorPickerWrapper,
  Icon,
  PickerWrapper,
  ColorInputContainer,
} from './ColorPicker.style';
import useOnClickOutside from '../../hooks/useClickOutside';

const ColorPicker = ({ value, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [testColor, setTestColor] = useState('#1E1E1E');
  const pickerRef = useRef();

  const openPicker = () => {
    setOpen(true);
  };

  const closePicker = () => {
    setOpen(false);
  };

  useOnClickOutside(pickerRef, closePicker);

  return (
    <ColorPickerWrapper>
      <Icon
        onClick={openPicker}
        style={{
          backgroundColor: testColor,
          pointerEvents: open ? 'none' : 'auto',
        }}
      />

      {
        open
        && (
        <PickerWrapper ref={pickerRef}>
          <HexColorPicker
            color={testColor}
            onChange={(e) => setTestColor(e)}
          />
          <ColorInputContainer>
            <HexColorInput
              color={testColor}
              onChange={(e) => setTestColor(e)}
            />
          </ColorInputContainer>
        </PickerWrapper>
        )
      }

    </ColorPickerWrapper>
  );
};

export default ColorPicker;
