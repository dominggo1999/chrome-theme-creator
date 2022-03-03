import React, { useRef, useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import {
  ColorPickerWrapper,
  Icon,
  PickerWrapper,
  ColorInputContainer,
} from './ColorPicker.style';
import useOnClickOutside from '../../hooks/useClickOutside';
import useHoverState from '../../store/useHoverStateStore';

const ColorPicker = ({
  setActive, onChange, color, ...rest
}) => {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef();
  const wrapperRef = useRef();
  const [reposition, setReposition] = useState(false);
  const setHoverable = useHoverState((state) => state.setHoverable);

  const openPicker = () => {
    setOpen(true);
    setHoverable(false);
    setActive(true);
  };

  const closePicker = () => {
    setOpen(false);
    setHoverable(true);
    setActive(false);
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
