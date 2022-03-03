import create from 'zustand';
import produce from 'immer';

const hoverable = true;
const useHoverableStore = create((set) => {
  return {
    hoverable,
    setHoverable: (newValue) => {
      set(produce((draft) => {
        draft.hoverable = newValue;
      }));
    },
  };
});

export default useHoverableStore;
