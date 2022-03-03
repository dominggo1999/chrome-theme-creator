import React from 'react';
import { SettingsWrapper, SettingsHeader, OptionsWrapper } from './NtpBackgroundSettings.style';
import { PanelWrapper } from '../../common/PanelWrapper';
import Select from '../../common/Select/Select';
import useNtpSettingsStore from '../../store/useNtpSettingsStore';
import useImagesStore from '../../store/useImagesStore';

const settingsSelector = (key) => {
  return useNtpSettingsStore((state) => state[key]);
};

const horizontalAlignmentOptions = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

const verticalAlignmentOptions = [
  { value: 'bottom', label: 'Bottom' },
  { value: 'top', label: 'Top' },
];

const repeatModeOptions = [
  { value: 'no-repeat', label: 'No Repeat' },
  { value: 'repeat', label: 'Repeat XY' },
  { value: 'repeat-x', label: 'Repeat X' },
  { value: 'repeat-y', label: 'Repeat Y' },
];

const backgroundSizeOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'fill-screen', label: 'Fill Screen' },
];

const NtpBackgroundSettings = () => {
  const horizontalAlignment = settingsSelector('horizontalAlignment');
  const verticalAlignment = settingsSelector('verticalAlignment');
  const repeatMode = settingsSelector('repeatMode');
  const backgroundSize = settingsSelector('backgroundSize');
  const updateNtpSettings = settingsSelector('updateNtpSettings');
  const ntpBackgroundName = useImagesStore((state) => state.images.ntp_background.fileName);

  if(!ntpBackgroundName) return null;

  const handleChange = (key, value) => {
    updateNtpSettings(key, value.value);
  };

  return (
    <SettingsWrapper>
      <PanelWrapper>
        <SettingsHeader>
          Ntp Background Alignment
        </SettingsHeader>
        <OptionsWrapper>

          <Select
            value={horizontalAlignment}
            options={horizontalAlignmentOptions}
            labelKey="label"
            valueKey="value"
            name="horizontal-alignment"
            handleChange={(val) => handleChange('horizontalAlignment', val)}
          />

          <Select
            value={verticalAlignment}
            options={verticalAlignmentOptions}
            labelKey="label"
            valueKey="value"
            name="vertical-alignment"
            handleChange={(val) => handleChange('verticalAlignment', val)}

          />
        </OptionsWrapper>

        <SettingsHeader>
          Ntp Background Size
        </SettingsHeader>

        <OptionsWrapper>

          <Select
            value={repeatMode}
            options={repeatModeOptions}
            labelKey="label"
            valueKey="value"
            name="repeat-mode"
            handleChange={(val) => handleChange('repeatMode', val)}
          />
          <Select
            value={backgroundSize}
            options={backgroundSizeOptions}
            labelKey="label"
            valueKey="value"
            name="background-size"
            handleChange={(val) => handleChange('backgroundSize', val)}
          />
        </OptionsWrapper>

      </PanelWrapper>
    </SettingsWrapper>
  );
};

export default NtpBackgroundSettings;
