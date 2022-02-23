import React from 'react';
import Sidebar from './layout/Sidebar/Sidebar';
import { AppContainer } from './App.style';
import Preview from './layout/Preview/Preview';

const App = () => {
  return (
    <AppContainer>
      <Sidebar />
      <Preview />
    </AppContainer>
  );
};

export default App;
