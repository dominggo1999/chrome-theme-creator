import create from 'zustand';
import produce from 'immer';

const initialFileName = '';

const changeFileName = (set, newFileName) => {
  return set(produce((draft) => {
    draft.name = newFileName;
  }));
};

const useBackgroundNameStore = create((set) => {
  return {
    name: initialFileName,
    changeFileName: (payload) => changeFileName(set, payload),
  };
});

export default useBackgroundNameStore;
