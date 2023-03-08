import { configureStore } from '@reduxjs/toolkit'
import PlacesSlice from './slices/places'

export const reduxStore = configureStore({
    reducer: {
        places: PlacesSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch