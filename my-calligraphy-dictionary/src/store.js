import { configureStore } from '@reduxjs/toolkit'
import kanaSliceReducer from './slices/kanaSlice'

export const store = configureStore({
    reducer: {
        kana: kanaSliceReducer
    },
})