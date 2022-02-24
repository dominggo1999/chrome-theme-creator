import create from 'zustand';

const initialImages = {
  frame: '',
  ntp_background: '',
  toolbar: '',
  inactive_tab_background: '',
  frame_overlay: '',
  ntp_attribution: '',
};

export const useColorsStore = create((set) => {
  return {
    colors: initialImages,
  };
});
