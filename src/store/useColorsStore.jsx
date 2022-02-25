import create from 'zustand';
import produce from 'immer';

export const initialColors = {
  active_tab_text: {
    name: 'active_tab_text',
    value: '#3C4043',
  },
  inactive_tab_text: {
    name: 'inactive_tab_text',
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
  title_bar: {
    name: 'title_bar',
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
