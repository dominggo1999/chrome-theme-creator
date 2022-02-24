import React, { useRef, useState, useEffect } from 'react';
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
  const wrapperRef = useRef();
  const [reposition, setReposition] = useState(false);

  const openPicker = () => {
    setOpen(true);
  };

  const closePicker = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Reposition picker if it's too down

    const {
      width, height, top, left,
    } = wrapperRef.current.getBoundingClientRect();

    const scrollTop = window.pageYOffset || document.body.scrollTop;
    const bottomIndicator = scrollTop + top + height + 250;
    const viewportHeight = window.innerHeight;

    if(bottomIndicator > viewportHeight) {
      setReposition(true);
    }
  }, []);

  useOnClickOutside(pickerRef, closePicker);

  return (
    <ColorPickerWrapper ref={wrapperRef}>
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
        <PickerWrapper
          reposition={reposition}
          ref={pickerRef}
        >
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
