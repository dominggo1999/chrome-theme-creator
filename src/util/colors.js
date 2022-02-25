import rgbHex from 'rgb-hex';

export const rgbArrayToCSS = (arr) => {
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
};

export const mapArrayToRGB = (arr, createObject = false) => {
  if(!createObject) {
    return arr.map((item) => {
      return rgbArrayToCSS(item);
    });
  }

  return arr.map((item) => {
    return {
      cssColor: rgbArrayToCSS(item),
      value: item,
    };
  });
};

export const mapArrayToHex = (arr) => {
  return arr.map((item) => {
    const rgb = rgbArrayToCSS(item);

    return `#${rgbHex(rgb)}`;
  });
};

export const hexToRgbArray = (hex) => {
  const res = hex.match(/[a-f0-9]{2}/gi);
  return res && res.length === 3
    ? res.map((v) => { return parseInt(v, 16); })
    : null;
};
