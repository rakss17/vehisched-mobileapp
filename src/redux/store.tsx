import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import personalInfoReducer from "./slices/personalInfoSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const personalInfoPersistConfig = {
  key: "personalInfo",
  storage: AsyncStorage,
};

const persistedPersonalInfoReducer = persistReducer(
  personalInfoPersistConfig,
  personalInfoReducer
);

const store = configureStore({
  reducer: {
    personalInfo: persistedPersonalInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
