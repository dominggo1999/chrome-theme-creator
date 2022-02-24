import React, { useState } from 'react';
import 'twin.macro';
import colorThief from '../lib/color-thief/color-thief';

const ColorExtractor = () => {
  const [palette, setPallete] = useState([]);
  const [src, setSrc] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSrc(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  const createColor = (r) => {
    return `rgb(${r[0]} ${r[1]} ${r[2]})`;
  };

  const handleLoad = (e) => {
    const src = e.target.src;
    const img = new Image();
    img.src = src;

    const palette = colorThief.prototype.getPalette(img, 8);
    setPallete(palette);
  };

  console.log(palette);

  return (
    <div>
      <input
        type="file"
        onChange={handleChange}
        accept=".jpg, .jpeg, .png"
      />
      {
        src
        && (
        <img
          onLoad={handleLoad}
          src={src}
          alt="main"
        />
        )
      }
      <br />
      <div tw="flex gap-x-2">
        {
          palette?.length > 0 && palette.map((i) => {
            const c = createColor(i);

            return (
              <div
                tw="w-[40px] h-[40px]"
                style={{ backgroundColor: c }}
                key={`color${i}`}
              >
              </div>
            );
          })
        }

      </div>
    </div>
  );
};

export default ColorExtractor;
