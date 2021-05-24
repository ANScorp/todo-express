import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducers from './rootReducer';
import createSocketMiddleware from './middleware/sockets';

const socketMiddleware = createSocketMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, socketMiddleware),
});

export default store;
