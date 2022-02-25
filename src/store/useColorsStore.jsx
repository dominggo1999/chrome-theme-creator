import create from 'zustand';
import produce from 'immer';

const initialColors = {
  frame: {
    name: 'frame',
    value: '#DEE1E6',
  },
  ntp_background: {
    name: 'ntp_background',
    value: '#FFFFFF',
  },
  toolbar: {
    name: 'toolbar',
    value: '#FFFFFF',
  },
  inactive_tab: {
    name: 'inactive_tab',
    value: '#DEE1E6',
  },
  bottom_link: {
    name: 'bottom_link',
    value: '#FFFFFF',
  },
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
    value: '#000000',
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

const useColorsStore = create((set) => {
  return {
    colors: initialColors,
    updateValue: (key, newValue) => updateValue(set, key, newValue),
  };
});

export default useColorsStore;
