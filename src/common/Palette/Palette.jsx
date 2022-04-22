import React, { useRef, useState } from 'react';
import { IoIosColorPalette } from 'react-icons/io';
import uuid from 'short-uuid';
import {
  PaletteWrapper, Icon, ColorPicker, ColorOption, NoPalette,
} from './Palette.style';
import usePaletteStore from '../../store/usePaletteStore';
import useOnClickOutside from '../../hooks/useClickOutside';

const Palette = ({ setActive, setHoverable, onChoose }) => {
  const colorPalette = usePaletteStore((state) => state.palette);
  const [open, setOpen] = useState(false);
  const colorPickerRef = useRef();

  const openPalette = () => {
    setOpen(!open);
    setActive(true);
    setHoverable(false);
  };

  const closePalette = () => {
    setOpen(false);
    setActive(false);
    setHoverable(true);
  };

  const handleOptionClick = (val) => {
    onChoose(val);
  };

  // Close color picker on click outside
  useOnClickOutside(colorPickerRef, closePalette, open, false);

  return (
    <PaletteWrapper>
      <Icon
        onClick={openPalette}
        style={{
          pointerEvents: open ? 'none' : 'auto',
        }}
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

      {
         !colorPalette.length && open && (
         <NoPalette ref={colorPickerRef}>
           Generate colors first to get color palette
         </NoPalette>
         )
      }

    </PaletteWrapper>
  );
};

export default Palette;
