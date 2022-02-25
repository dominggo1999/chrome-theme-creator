import create from 'zustand';
import produce from 'immer';

export const initialImages = {
  frame: {
    name: 'frame',
    image: '',
    color: '#ffffff',
  },
  ntp_background: {
    name: 'ntp_background',
    image: '',
    color: '#ffffff',
  },
  toolbar: {
    name: 'toolbar',
    image: '',
    color: '#ffffff',
  },
  inactive_tab_background: {
    name: 'inactive_tab_background',
    colorOnly: true,
    color: '#ffffff',

  },
  frame_overlay: {
    name: 'frame_overlay',
    colorOnly: true,
    color: '#ffffff',
  },
  ntp_attribution: {
    name: 'ntp_attribution',
    colorOnly: true,
    color: '#ffffff',
  },
};

const updateImagesValue = (set, key, newValue) => {
  return set(produce((draft) => {
    // Only update if there is an image
    if(!draft.images[key].colorOnly) {
      draft.images[key].image = newValue;
    }
  }));
};

const updateImagesColor = (set, key, newValue) => {
  return set(produce((draft) => {
    draft.images[key].color = newValue;
  }));
};

const useImagesStore = create((set) => {
  return {
    images: initialImages,
    updateImagesValue: (key, newValue) => updateImagesValue(set, key, newValue),
    updateImagesColor: (key, newValue) => updateImagesColor(set, key, newValue),
  };
});

export default useImagesStore;
