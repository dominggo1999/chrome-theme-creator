import create from 'zustand';
import produce from 'immer';

export const initialColors = {
  tab_text: {
    name: 'tab_text',
    value: '#3C4043',
  },
  tab_background_text: {
    name: 'tab_background_text',
    value: '#3C4043',
  },
  bookmark_text: {
    name: 'bookmark_text',
    value: '#3C4043',
  },
  ntp_text: {
    name: 'ntp_text',
    value: '#000000',
  },
  button_background: {
    name: 'button_background',
    value: '#DEE1E6',
  },
  navigation: {
    name: 'navigation',
    value: '#707070',
  },
};

const updateValue = (set, key, newValue) => {
  return set(produce((draft) => {
    draft.colors[key].value = newValue;
  }));
};

const useColorsStore = create((set, get) => {
  return {
    colors: initialColors,
    updateValue: (key, newValue) => updateValue(set, key, newValue),
    getColors: () => get().colors,
  };
});

export default useColorsStore;
