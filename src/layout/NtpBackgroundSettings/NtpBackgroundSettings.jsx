import React from 'react';
import { SettingsWrapper, SettingsHeader, OptionsWrapper } from './NtpBackgroundSettings.style';
import { PanelWrapper } from '../../common/PanelWrapper';
import Select from '../../common/Select/Select';

const defaultHorizontalAlignment = 'center';
const defaultVerticalAlignment = 'bottom';
const defaultRepeatMode = 'no-repeat';
const defaultBackgroundSize = 'normal';

const horizontalAlignment = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

const verticalAlignment = [
  { value: 'bottom', label: 'Bottom' },
  { value: 'top', label: 'Top' },
];

const repeatMode = [
  { value: 'no-repeat', label: 'No Repeat' },
  { value: 'repeat-x-y', label: 'Repeat XY' },
  { value: 'repeat-x', label: 'Repeat X' },
  { value: 'repeat-y', label: 'Repeat Y' },
];

const backgroundSize = [
  { value: 'normal', label: 'Normal' },
  { value: 'fill-screen', label: 'Fill Screen' },
];

const NtpBackgroundSettings = () => {
  return (
    <SettingsWrapper>
      <PanelWrapper>
        <SettingsHeader>
          Ntp Background Alignment
        </SettingsHeader>
        <OptionsWrapper>

          <Select
            value={defaultHorizontalAlignment}
            options={horizontalAlignment}
            labelKey="label"
            valueKey="value"
            name="horizontal-alignment"
          />

          <Select
            value={defaultVerticalAlignment}
            options={verticalAlignment}
            labelKey="label"
            valueKey="value"
            name="vertical-alignment"
          />
        </OptionsWrapper>

        <SettingsHeader>
          Ntp Background Size
        </SettingsHeader>

        <OptionsWrapper>

          <Select
            value={defaultRepeatMode}
            options={repeatMode}
            labelKey="label"
            valueKey="value"
            name="repeat-mode"
          />
          <Select
            value={defaultBackgroundSize}
            options={backgroundSize}
            labelKey="label"
            valueKey="value"
            name="background-size"
          />
        </OptionsWrapper>

      </PanelWrapper>
    </SettingsWrapper>
  );
};

export default NtpBackgroundSettings;
