import React, { useEffect, useRef, useState } from 'react';
import { IoIosColorPalette } from 'react-icons/io';
import uuid from 'short-uuid';
import {
  PaletteWrapper, Icon, ColorPicker, ColorOption,
} from './Palette.style';
import usePaletteStore from '../../store/usePaletteStore';
import useImagesStore from '../../store/useImagesStore';
import useOnClickOutside from '../../hooks/useClickOutside';

const Palette = ({ setActive, onChoose }) => {
  const colorPalette = usePaletteStore((state) => state.palette);
  const backgroundImage = useImagesStore(((state) => state.images.frame));
  const [disable, setDisable] = useState(true);
  const [open, setOpen] = useState(false);
  const colorPickerRef = useRef();

  useEffect(() => {
    if(backgroundImage && colorPalette.length) {
      setDisable(false);
    }
  }, [backgroundImage]);

  const openPalette = () => {
    if(colorPalette.length) {
      setOpen(!open);
      setActive(true);
    }
  };

  const closePalette = () => {
    if(colorPalette.length) {
      setOpen(false);
      setActive(false);
    }
  };

  const handleOptionClick = (val) => {
    onChoose(val);
  };

  // Close color picker on click outside
  useOnClickOutside(colorPickerRef, closePalette);

  return (
    <PaletteWrapper>
      <Icon
        style={{
          pointerEvents: open ? 'none' : 'auto',
        }}
        disable={disable}
        onClick={openPalette}
      >
        <IoIosColorPalette />
      </Icon>

      {
        colorPalette.length > 0 && open && (
          <ColorPicker ref={colorPickerRef}>
            {
              colorPalette.map((c) => {
                return (
                  <ColorOption
                    onClick={() => handleOptionClick(c)}
                    style={{ backgroundColor: c }}
                    key={uuid.generate()}
                  >
                  </ColorOption>
                );
              })
            }
          </ColorPicker>
        )
      }
    </PaletteWrapper>
  );
};

export default Palette;
