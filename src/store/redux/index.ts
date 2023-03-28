import { configureStore } from '@reduxjs/toolkit'
import FiltersSlice from './slices/filters'
import PlacesSlice from './slices/places'
import UserSlice  from './slices/user'

export const reduxStore = configureStore({
    reducer: {
        user: UserSlice,
        places: PlacesSlice,
        filters: FiltersSlice,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch
