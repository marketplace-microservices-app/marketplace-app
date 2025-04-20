import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Unique persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
};

// Unique persist config for cart
const cartPersistConfig = {
  key: "cart",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer), // Assuming you have a cart slice as well
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export const persistor = persistStore(store);
