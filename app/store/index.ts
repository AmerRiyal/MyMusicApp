import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import Reducers from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  {...persistConfig, whitelist: ['auth']},
  combineReducers(Reducers),
);

const Store = createStore(
  persistedReducer,
);
export const persistor = persistStore(Store);

export default Store;
