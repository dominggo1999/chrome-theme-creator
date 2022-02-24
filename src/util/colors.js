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
