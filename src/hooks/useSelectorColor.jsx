import useColorsStore from '../store/useColorsStore';
import useImagesStore from '../store/useImagesStore';

export const useSelectorColorOnly = (property) => {
  return useColorsStore((state) => state.colors[property].value);
};

export const useSelectorImagesColor = (property) => {
  return useImagesStore((state) => state.images[property].color);
};

export const useSelectorImageValue = (property) => {
  return useImagesStore((state) => state.images[property].image);
};
