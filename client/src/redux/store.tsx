import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { get } from 'react-hook-form'
 
 

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'isAuthenticated'] // only navigation will be persisted
}

const persistedReducer = persistReducer(persistConfig, authReducer)
 const store = configureStore({
  reducer: {
    // 
    auth: persistedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/FLUSH', 'persist/PAUSE', 'persist/REGISTER'],
        // ignoredPaths: ['auth.user', 'auth.isAuthenticated']
    }
})
})

export const persistor = persistStore(store);
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch