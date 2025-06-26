import { configureStore } from '@reduxjs/toolkit'
import wishlistSlice  from './reducers/wishlistSlice'
import { persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'wishlist',
  storage: AsyncStorage,
}


const persistedReducer = persistReducer(persistConfig, wishlistSlice)
const store = configureStore({
  reducer: { wishlist: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export { store, persistor }