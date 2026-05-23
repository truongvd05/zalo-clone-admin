import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "@/feature/Admin/adminSlice";
import { adminApi } from "@/feature/Admin/adminApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import statsReducer from "@/feature/Stats/statsSlice";
import { authApi } from "@/feature/Auth/authApi";

const storage = {
    getItem(key) {
        return Promise.resolve(localStorage.getItem(key));
    },

    setItem(key, value) {
        localStorage.setItem(key, value);
        return Promise.resolve(true);
    },

    removeItem(key) {
        localStorage.removeItem(key);
        return Promise.resolve();
    },
};

const userPersistConfig = {
    key: "admin",
    storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        stats: statsReducer,
        admin: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(adminApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
