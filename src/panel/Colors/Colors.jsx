import React from 'react';
import shallow from 'zustand/shallow';
import { PanelWrapper } from '../../common/PanelWrapper';
import { ColorsWrapper } from './Colors.style';
import useColorsStore from '../../store/useColorsStore';
import PropertyEditor from '../../common/PropertyEditor/PropertyEditor';

const Colors = () => {
  const colorOnlyProperties = useColorsStore((state) => Object.keys(state.colors), shallow);

  return (
    <PanelWrapper>
      <ColorsWrapper>
        {
          colorOnlyProperties.map((item) => {
            return (
              <PropertyEditor
                key={`colors${item}`}
                propertyName={item}
                colorOnly
              />
            );
          })
        }
      </ColorsWrapper>
    </PanelWrapper>
  );
};

export default Colors;
