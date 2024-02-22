import store, { persister } from '../appStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const StoreProvider = ({ children }: { children: React.ReactChild | React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
