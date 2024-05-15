// module imports
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// component imports
import RootNavigation from '@Navigation/index';
import reduxStore from '@Redux/index';

const reduxPersistStore = persistStore(reduxStore);

const App = () => {
    return (
        <Provider store={reduxStore}>
            <PersistGate persistor={reduxPersistStore}>
                <RootNavigation />
            </PersistGate>
        </Provider>
    );
};

export default App;
