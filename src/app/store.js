import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import { cartSlice } from "../features/cart";

export const store = configureStore({
    reducer : {
        cart : cartSlice.reducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware : (gM) => gM({
        serializableCheck: false, 
      }).concat(apiSlice.middleware),
})