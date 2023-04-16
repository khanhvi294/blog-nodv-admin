import './index.css';

import { QueryClientProvider } from 'react-query';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { queryClient } from './config/reactQueryConfig';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistStore(store)}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</PersistGate>
	</Provider>,
);
