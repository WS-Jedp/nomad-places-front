import { configureStore } from '@reduxjs/toolkit'
import FiltersSlice from './slices/filters'
import PlacesSlice from './slices/places'
import UserSlice  from './slices/user'
import PlaceSesssionActionsSlice from './slices/sessionActions/update'

export const reduxStore = configureStore({
    reducer: {
        user: UserSlice,
        places: PlacesSlice,
        filters: FiltersSlice,
        placeSession: PlaceSesssionActionsSlice,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch
