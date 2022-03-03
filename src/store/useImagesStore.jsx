import create from 'zustand';
import produce from 'immer';

export const initialImages = {
  frame: {
    name: 'frame',
    image: '',
    color: '#DEE1E6',
    fileName: '',
    width: 20,
    height: 1920,
  },
  ntp_background: {
    name: 'ntp_background',
    image: '',
    color: '#ffffff',
    fileName: '',
    width: 0,
    height: 0,
  },
  toolbar: {
    name: 'toolbar',
    image: '',
    color: '#ffffff',
    fileName: '',
    width: 20,
    height: 120,
  },
  tab_background: {
    name: 'tab_background',
    color: '#DEE1E6',
    image: '',
    fileName: '',
    width: 20,
    height: 120,
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

const updateFileName = (set, key, newValue) => {
  return set(produce((draft) => {
    // Only update if there is a color
    draft.images[key].fileName = newValue;
  }));
};

const updateNtpBackgroundSize = (set, newValue) => {
  const { width, height } = newValue;

  return set(produce((draft) => {
    // Only update if there is a color
    draft.images.ntp_background.width = width;
    draft.images.ntp_background.height = height;
  }));
};

const useImagesStore = create((set, get) => {
  return {
    images: initialImages,
    updateImagesValue: (key, newValue) => updateImagesValue(set, key, newValue),
    updateImagesColor: (key, newValue) => updateImagesColor(set, key, newValue),
    updateFileName: (key, newValue) => updateFileName(set, key, newValue),
    updateNtpBackgroundSize: (newValue) => updateNtpBackgroundSize(set, newValue),
    getImages: () => get().images,
  };
});

export default useImagesStore;
