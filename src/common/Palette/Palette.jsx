import React, { useEffect, useRef, useState } from 'react';
import { IoIosColorPalette } from 'react-icons/io';
import uuid from 'short-uuid';
import {
  PaletteWrapper, Icon, ColorPicker, ColorOption,
} from './Palette.style';
import usePaletteStore from '../../store/usePaletteStore';
import useImagesStore from '../../store/useImagesStore';
import { mapArrayToRGB } from '../../util/colors';
import useOnClickOutside from '../../hooks/useClickOutside';

const Palette = ({ handleChange }) => {
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

  const closePalette = () => {
    if(colorPalette.length) {
      setOpen(false);
    }
  };

  const openPalette = () => {
    if(colorPalette.length) {
      setOpen(!open);
    }
  };

  const handleOptionClick = (val) => {
    console.log(val);

    // Set color here
  };

  const colors = mapArrayToRGB(colorPalette, true);

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
              colors.map((c) => {
                return (
                  <ColorOption
                    onClick={() => handleOptionClick(c.value)}
                    style={{ backgroundColor: c.cssColor }}
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
