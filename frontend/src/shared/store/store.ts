import { siteStatApi } from "@/shared/api/siteStatApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [siteStatApi.reducerPath]: siteStatApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(siteStatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
