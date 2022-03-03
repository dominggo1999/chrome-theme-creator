import create from 'zustand';
import produce from 'immer';

// Hover state each of the editor color/image picker
const initialHoverState = {
  hover_frame: false,
  hover_ntp_background: false,
  hover_toolbar: false,
  hover_tab_background: false,
  hover_tab_text: false,
  hover_tab_background_text: false,
  hover_bookmark_text: false,
  hover_ntp_text: false,
  hover_button_background: false,
  hover_navigation: false,
};

const updateValue = (set, key, newValue) => {
  return set(produce((draft) => {
    draft[key] = newValue;
  }));
};

const useHoverState = create((set) => {
  return {
    hoverState: initialHoverState,
    updateHoverState: (key, newValue) => updateValue(set, key, newValue),
  };
});

export default useHoverState;
