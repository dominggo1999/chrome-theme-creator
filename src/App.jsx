import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar/Sidebar';
import {
  AppContainer,
  CapsuleWrapper,
  Capsule,
} from './App.style';
import Preview from './layout/Preview/Preview';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <AppContainer>
            <Sidebar />
            <Preview />
            <CapsuleWrapper>
              <Capsule id="capsule" />
            </CapsuleWrapper>
          </AppContainer>
        )}
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default App;
