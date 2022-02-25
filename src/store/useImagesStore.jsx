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
  inactive_tab: {
    name: 'inactive_tab',
    color: '#ffffff',

  },
  frame_overlay: {
    name: 'frame_overlay',
    color: '#ffffff',
    imageOnly: true,
  },
  ntp_attribution: {
    name: 'ntp_attribution',
    color: '#ffffff',
    imageOnly: true,
  },
};

const updateImagesValue = (set, key, newValue) => {
  return set(produce((draft) => {
    draft.images[key].image = newValue;
  }));
};

const updateImagesColor = (set, key, newValue) => {
  return set(produce((draft) => {
    // Only update if there is a color
    if(draft.images[key].color) {
      draft.images[key].color = newValue;
    }
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
