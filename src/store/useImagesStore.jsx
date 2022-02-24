import create from 'zustand';
import produce from 'immer';

export const initialImages = {
  frame: {
    name: 'frame',
    value: '',
    color: '#ffffff',
  },
  frame_image_name: {
    name: 'frame_image_name',
    value: '',
    color: '#ffffff',
  },
  ntp_background: {
    name: 'ntp_background',
    value: '',
    color: '#ffffff',
  },
  toolbar: {
    name: 'toolbar',
    value: '',
    color: '#ffffff',
  },
  inactive_tab_background: {
    name: 'inactive_tab_background',
    value: '',
    colorOnly: true,
  },
  frame_overlay: {
    name: 'frame_overlay',
    value: '',
    colorOnly: true,
  },
  ntp_attribution: {
    name: 'ntp_attribution',
    value: '',
    colorOnly: true,
  },
};

const updateValue = (set, key, newValue) => {
  return set(produce((draft) => {
    draft.images[key].value = newValue;
  }));
};

const useImagesStore = create((set) => {
  return {
    images: initialImages,
    updateValue: (key, newValue) => updateValue(set, key, newValue),
  };
});

export default useImagesStore;
