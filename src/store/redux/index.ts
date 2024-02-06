import { configureStore } from '@reduxjs/toolkit'
import FiltersSlice from './slices/filters'
import PlacesSlice from './slices/places'
import UserSlice  from './slices/user'
import PlaceSesssionActionsSlice from './slices/sessionActions/update'
import UserSessionSlice  from './slices/userSession'
import SpotSessionSlice  from './slices/spotSession'
import ControlledErrorsSlice  from './slices/controlledErrors'

export const reduxStore = configureStore({
    reducer: {
        user: UserSlice,
        places: PlacesSlice,
        filters: FiltersSlice,
        placeSession: PlaceSesssionActionsSlice,
        userSession: UserSessionSlice,
        spotSession: SpotSessionSlice,
        controlledErrors: ControlledErrorsSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch
