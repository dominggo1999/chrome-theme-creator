import create from 'zustand';
import produce from 'immer';

const defaultHorizontalAlignment = 'center';
const defaultVerticalAlignment = 'bottom';
const defaultRepeatMode = 'no-repeat';
const defaultBackgroundSize = 'normal';

const updateNtpSettings = (set, key, newValue) => {
  return set(produce((draft) => {
    // Only update if there is a color
    draft[key] = newValue;
  }));
};

const useNtpSettingsStore = create((set, get) => {
  return {
    horizontalAlignment: defaultHorizontalAlignment,
    verticalAlignment: defaultVerticalAlignment,
    repeatMode: defaultRepeatMode,
    backgroundSize: defaultBackgroundSize,
    updateNtpSettings: (key, newValue) => updateNtpSettings(set, key, newValue),
    getNtpSettings: () => {
      return {
        horizontalAlignment: get().horizontalAlignment,
        verticalAlignment: get().verticalAlignment,
        repeatMode: get().repeatMode,
        backgroundSize: get().backgroundSize,
      };
    },
  };
});

export default useNtpSettingsStore;
