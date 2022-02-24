import create from 'zustand';
import produce from 'immer';

const initialPallete = [];

const usePaletteStore = create((set) => {
  return {
    palette: initialPallete,
    changePallete: (payload) => {
      set(produce((draft) => {
        draft.palette = payload;
      }));
    },
  };
});

export default usePaletteStore;
