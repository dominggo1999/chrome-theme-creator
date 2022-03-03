import React, { useRef, useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import {
  ColorPickerWrapper,
  Icon,
  PickerWrapper,
  ColorInputContainer,
} from './ColorPicker.style';
import useOnClickOutside from '../../hooks/useClickOutside';

const ColorPicker = ({
  setActive, setHoverable, onChange, color, ...rest
}) => {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef();
  const wrapperRef = useRef();
  const [reposition, setReposition] = useState(false);

  const openPicker = () => {
    setOpen(true);
    setActive(true);
    setHoverable(false);
  };

  const closePicker = () => {
    setOpen(false);
    setActive(false);
    setHoverable(true);
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
          backgroundColor: color,
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
            color={color}
            onChange={onChange}
          />
          <ColorInputContainer>
            <HexColorInput
              color={color}
              onChange={onChange}
            />
          </ColorInputContainer>
        </PickerWrapper>
        )
      }

    </ColorPickerWrapper>
  );
};

export default ColorPicker;
