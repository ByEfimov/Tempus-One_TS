import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './Assets/Styles/null.css';
import './Assets/Styles/animations.css';
import { Provider } from 'react-redux';
import store, { persister } from './Store/index.ts';
import './Api/firebase';
import { PersistGate } from 'redux-persist/integration/react';
import ListenerFB from './Api/ListenerFireBase.tsx';
import HeaderWrapper from './Components/Header/HeaderWrapper.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persister} loading={null}>
                    <ListenerFB>
                        <HeaderWrapper>
                            <App />
                        </HeaderWrapper>
                    </ListenerFB>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
