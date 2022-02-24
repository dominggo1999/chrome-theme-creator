import create from 'zustand';
import produce from 'immer';

const initialImages = {
  frame: '',
  ntp_background: '',
  toolbar: '',
  inactive_tab_background: '',
  frame_overlay: '',
  ntp_attribution: '',
};

const updateValue = (set, key, newValue) => {
  return set(produce((draft) => {
    draft.images[key] = newValue;
  }));
};

const useImagesStore = create((set) => {
  return {
    images: initialImages,
    updateValue: (key, newValue) => updateValue(set, key, newValue),
  };
});

export default useImagesStore;
