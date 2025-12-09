import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

import { authSlice } from "@/features/auth/authSlice";
import { postSlice } from "@/features/post/postSlice";
import { feedSlice } from "@/features/feed/feedSlice";

const transforms = import.meta.env.DEV
  ? []
  : [
      encryptTransform({
        secretKey: "my-super-secrets-key",
        onError: function (error) {
          console.warn(error);
        },
      }),
    ];

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    authSlice.reducerPath,
    postSlice.reducerPath,
    feedSlice.reducerPath,
  ],
  transforms,
};

const authPersistConfig = {
  key: authSlice.reducerPath,
  storage,
  blacklist: ["fetching"],
  transforms,
};

const rootReducer = combineReducers({
  [authSlice.reducerPath]: persistReducer(authPersistConfig, authSlice.reducer),
  [feedSlice.reducerPath]: feedSlice.reducer,
  [postSlice.reducerPath]: postSlice.reducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddlewares) => [
    ...getDefaultMiddlewares({
      serializableCheck: false,
    }),
  ],
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
