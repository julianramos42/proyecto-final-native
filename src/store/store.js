import { configureStore } from "@reduxjs/toolkit";
import textReducer from './search/reducer'
import categoryReducer from './Categories/reducer'
import statusReducer from './StatusDrawer/reducer'

export const store = configureStore({
    reducer: {
        text: textReducer,
        categories: categoryReducer,
        status: statusReducer
    }
})