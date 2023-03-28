import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Geolocation } from '@capacitor/geolocation'

import { User } from '../../../../models/user'
import { GeoLocation } from '../../../../models/location'



export interface UserState {
    userData?:  User
    location: Partial<GeoLocation>
    isAuth?: boolean
}

const initialUserState: UserState = {
    location: {
        latitude: undefined,
        longitude: undefined
    }
}

export const getUserGeoLocation = createAsyncThunk<GeoLocation | null, void>(
    'user/getGeoLocation',
    async (param, thunkApi)  => {
        const { coords } = await Geolocation.getCurrentPosition()
        if(!coords) return null
        return {
            latitude: coords.latitude,
            longitude: coords.longitude
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
       setUserGeoLocation(state, action: PayloadAction<{ coordinates: GeoLocation }>) {
        state.location = action.payload.coordinates
       },
       resetGeoLocation(state) {
        state.location = {
            latitude: undefined,
            longitude: undefined
        }
       }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserGeoLocation.fulfilled, (state, action) => {
            if(!action.payload) return
            state.location = action.payload
        })
    }
})


export const { 
    setUserGeoLocation, resetGeoLocation,
} = userSlice.actions 

export default userSlice.reducer