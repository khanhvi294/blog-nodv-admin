import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import { persistReducer } from 'redux-persist';
import socketReducer from './slices/socketSlice';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
	socket: socketReducer,
});

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
