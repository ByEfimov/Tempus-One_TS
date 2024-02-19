import BaseLayout from './layouts/baseLayout';
import StoreProvider from './providers/storeProvider';
import '@/Api/firebase';
import '@/Assets/Styles/animations.css';
import '@/Assets/Styles/null.css';
import NavigationReducer from '@/Components/header/navigation-reducer';
import FireBaseProvider from '@/app/providers/fireBaseProvider';
import LevelProvider from '@/app/providers/levelProvider';
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
