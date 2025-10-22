import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

import { counterSlice } from "@/features/counter";
import { productSlice } from "@/features/product";
import { authSlice } from "@/features/auth";
import { addressApi } from "@/features/address/addressSlice";

const transforms = import.meta.env.DEV
    ? []
    : [
        encryptTransform({
            secretKey: "my-super-secrets-key",
            onError: function (error){
                console.warn(error)
            },
        })
    ]

const persistConfig = {
    key: "root",
    storage,
    blacklist: [authSlice.reducerPath, productSlice.reducerPath],
    transforms
}

const authPersistConfig = {
    key: authSlice.reducerPath,
    storage,
    blacklist: ["fetching"],
    transforms
}

const rootReducer = combineReducers({
    [authSlice.reducerPath]: persistReducer(
        authPersistConfig,
        authSlice.reducer
    ),
    [counterSlice.reducerPath]: counterSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
});

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddlewares) => [
        ...getDefaultMiddlewares({
            serializableCheck: false
        }),
        addressApi.middleware,
    ],
})

const persistor = persistStore(store);

setupListeners(store.dispatch);

// Trick
window.store = store;

export { store, persistor };