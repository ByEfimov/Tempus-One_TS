import ListenerFB from './Api/ListenerFireBase.tsx';
import './Api/firebase';
import App from './App.tsx';
import './Assets/Styles/animations.css';
import './Assets/Styles/null.css';
import HeaderReducer from './Components/Header/HeaderReducer.tsx';
import store, { persister } from './Store/index.ts';
import LevelReducer from 'Components/Level/LevelReducer.tsx';
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
                            <HeaderReducer />
                            <App />
                        </LevelReducer>
                    </ListenerFB>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
