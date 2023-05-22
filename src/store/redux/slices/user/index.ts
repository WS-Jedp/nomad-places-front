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
    },
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
       },
       updateUserPersonalInformation(state, action: PayloadAction<{ personalInformation: User['personalInformation'], profilePicture?: string }>) {
            if(!state.userData) {
                state.userData = {
                    id: '',
                    email: '',
                    username: '',
                    personalInformation: action.payload.personalInformation,
                    profilePicture: action.payload.profilePicture
                }
            } else {
                state.userData!.personalInformation = action.payload.personalInformation
                state.userData!.profilePicture = action.payload.profilePicture
            }
       },
       updateProfilePicture(state, action: PayloadAction<{ profilePicture: User['profilePicture'] }>) {
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
    updateUserPersonalInformation
} = userSlice.actions 

export default userSlice.reducer