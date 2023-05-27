import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Geolocation } from '@capacitor/geolocation'

import { Person, User } from '../../../../models/user'
import { GeoLocation } from '../../../../models/location'
import { LoginDTO, RegisterUserRequestDTO } from '../../../../dto/auth'
import { AuthServices } from '../../../../services/auth'

export interface UserState {
    userData?:  User
    auth: {
        isAuth: boolean
        token: string | null
        roles: string[]
    }
    location: Partial<GeoLocation>
}

const initialUserState: UserState = {
    userData: undefined,
    location: {
        latitude: undefined,
        longitude: undefined
    },
    auth: {
        isAuth: false,
        token: null,
        roles: []
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

export const getPersonInformation = createAsyncThunk<User['personalInformation'], { token: string }>(
    'user/getPersonInformation',
    async (params, thunkApi) => {
        const authServices = new AuthServices()
        const person = await authServices.getPersonFromUser({ token: params.token })
        return person.person
    }
)

export const authUser = createAsyncThunk<LoginDTO, { username: string, password: string }>(
    'user/authUser',
    async (params, thunkApi) => {
        const authServices = new AuthServices()
        const user = await authServices.login({ emailOrUsername: params.username, password: params.password })
        return user
    }
)

export const registerUser = createAsyncThunk<LoginDTO, { payload: RegisterUserRequestDTO }>(
    'user/registerUser',
    async ({ payload }) => {
        const authServices = new AuthServices()
        const user = await authServices.register(payload)
        return user
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
       setUserPersonalInformation(state, action: PayloadAction<{ personalInformation: Person }>) {
            if(state.userData) {
                state.userData.personalInformation = action.payload.personalInformation
            }
       },
       updateUserPersonalInformation(state, action: PayloadAction<{ personalInformation: Omit<Person, 'id'>, profilePicture?: string }>) {
            if(state.userData) {
                state.userData!.personalInformation = {
                    id: state.userData.personalInformation.id,
                    ...action.payload.personalInformation,
                }
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

        builder.addCase(getPersonInformation.fulfilled, (state, action) => {
            if(!state.userData) return
            state.userData.personalInformation = action.payload
        })

        builder.addCase(authUser.fulfilled, (state, action) => {
            state.userData = {
                id: action.payload.user.id,
                username: action.payload.user.username,
                email: action.payload.user.email,
                personalInformation: {
                    id: action.payload.user.personID,
                    firstName: action.payload.user.firstName,
                }
            }
            state.auth.token = action.payload.access_token
            state.auth.isAuth = true
            state.auth.roles = []
        })
        builder.addCase(authUser.rejected, (state, action) => {
            console.error('Error: ', action.error.message)
        })

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.userData = {
                id: action.payload.user.id,
                username: action.payload.user.username,
                email: action.payload.user.email,
                personalInformation: {
                    id: action.payload.user.personID,
                    firstName: action.payload.user.firstName,
                }
            }
            state.auth.token = action.payload.access_token
            state.auth.isAuth = true
            state.auth.roles = []
        })
    }
})


export const { 
    setUserGeoLocation, resetGeoLocation,
    updateUserPersonalInformation, setUserPersonalInformation,
} = userSlice.actions 

export default userSlice.reducer