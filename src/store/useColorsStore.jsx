import create from 'zustand';
import produce from 'immer';

const initialColors = {
  frame: '#DEE1E6',
  ntp_background: '#FFFFFF',
  toolbar: '#FFFFFF',
  inactive_tab_background: '#DEE1E6',
  bottom_link: '#FFFFFF',
  active_tab_text: '#3C4043',
  inactive_tab_text: '#3C4043',
  bookmark_text: '#3C4043',
  ntp_text: '#000000',
  title_bar: '#000000',
  navigation: '#707070',
};

export const useColorsStore = create((set) => {
  return {
    colors: initialColors,
  };
});
