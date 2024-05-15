// module imports
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// component imports
import { KEYS } from '@Constant/enums';

const persistConfig = {
    key: KEYS.asyncStorageKey,
    storage: AsyncStorage,
    blacklist: [],
};

const appReducer = combineReducers({

});

const persistedReducer = persistReducer(persistConfig, appReducer);

const rootReducer = (state, action) => {
    return persistedReducer(state, action);
};

export default rootReducer;

