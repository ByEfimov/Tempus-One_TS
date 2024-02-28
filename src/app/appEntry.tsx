import BaseLayout from './layouts/baseLayout';
import StoreProvider from './providers/storeProvider';
import '@/app/assets/Styles/animations.css';
import '@/app/assets/Styles/null.css';
import FireBaseProvider from '@/app/providers/fireBaseProvider';
import LevelProvider from '@/app/providers/levelProvider';
import NavigationReducer from '@/app/providers/navigationProvider';
import '@/features/api/firebase';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <FireBaseProvider>
          <LevelProvider>
            <NavigationReducer>
              <BaseLayout />
            </NavigationReducer>
          </LevelProvider>
        </FireBaseProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
