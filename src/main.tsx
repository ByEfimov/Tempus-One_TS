import './Api/firebase';
import App from './App.tsx';
import './Assets/Styles/animations.css';
import './Assets/Styles/null.css';
import store, { persister } from './Store/index.ts';
import ListenerFB from 'Api/listener-fire-base.tsx';
import NavigationReducer from 'Components/header/navigation-reducer.tsx';
import LevelReducer from 'Components/level/level-reducer.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persister} loading={null}>
                    <ListenerFB>
                        <LevelReducer>
                            <NavigationReducer />
                            <App />
                        </LevelReducer>
                    </ListenerFB>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
