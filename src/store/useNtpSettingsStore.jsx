import create from 'zustand';
import produce from 'immer';

export const defaultHorizontalAlignment = 'center';
export const defaultVerticalAlignment = 'bottom';
export const defaultRepeatMode = 'no-repeat';
export const defaultBackgroundSize = 'normal';

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
  };
});

export default useNtpSettingsStore;
