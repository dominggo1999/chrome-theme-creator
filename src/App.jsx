import React from 'react';
import Sidebar from './layout/Sidebar/Sidebar';
import {
  AppContainer,
  CapsuleWrapper,
  Capsule,
} from './App.style';
import Preview from './layout/Preview/Preview';

const App = () => {
  return (
    <AppContainer>
      <Sidebar />
      <Preview />
      <CapsuleWrapper>
        <Capsule id="capsule" />
      </CapsuleWrapper>
    </AppContainer>
  );
};

export default App;
