import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Geolocation } from '@capacitor/geolocation'

import { Person, User } from '../../../../models/user'
import { GeoLocation } from '../../../../models/location'
import { LoginDTO, RegisterUserRequestDTO } from '../../../../dto/auth'
import { AuthServices } from '../../../../services/auth'
import { ProfileDTO } from '../../../../dto/user'
import { TOKEN_KEY } from '../../../../common/constants/localstorage'
import { ControlledError } from '../../../../common/controlledError'
import { ControlledErrorType } from '../../../../common/controlledError/types'

export interface UserState {
    userData?:  User
    auth: {
        isAuth: boolean
        token: string | null
        roles: string[]
    }
    location: Partial<GeoLocation>
    errors: ControlledError[]
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
    },
    errors: []
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
export const getUserData = createAsyncThunk<ProfileDTO | ControlledError, { token: string }>(
    'user/getUserData',
    async (params) => {
        const authServices = new AuthServices()
        const user = await authServices.getPersonFromUser({ token: params.token }).catch(err => {
            return new ControlledError(err.message, ControlledErrorType.REQUEST, err)
        })
        return user
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
        const token = user.access_token
        localStorage.setItem(TOKEN_KEY, token)
        return user
    }
)

export const registerUser = createAsyncThunk<LoginDTO, { payload: RegisterUserRequestDTO }>(
    'user/registerUser',
    async ({ payload }, thunkApi) => {
        const authServices = new AuthServices()
        const user = await authServices.register(payload)
        await thunkApi.dispatch(authUser({ username: payload.userData.username, password: payload.userData.password }))
        localStorage.setItem(TOKEN_KEY, user.access_token)
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
        updateProfilePicture(state, action: PayloadAction<{ profilePicture: User['profilePicture'] }>) {},
        logout(state) {
            state.auth.isAuth = false
            state.auth.token = null
            state.auth.roles = []
            state.userData = undefined
            localStorage.removeItem(TOKEN_KEY)
        },
        resetErros: (state) => {
            state.errors = []
        },
        removeError: (state, action: PayloadAction<{ error: ControlledError }>) => {
            const index = state.errors.findIndex(err => err.message === action.payload.error.message)
            if(index !== -1) {
                state.errors.splice(index, 1)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserGeoLocation.fulfilled, (state, action) => {
            if(!action.payload) return
            state.location = action.payload
        })

        // get person information
        builder.addCase(getPersonInformation.fulfilled, (state, action) => {
            if(!state.userData) return
            state.userData.personalInformation = action.payload
        })

        // Auth user
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

        // Register user
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

        // Get user data
        builder.addCase(getUserData.fulfilled, (state, action) => {

            if(action.payload instanceof ControlledError) {
                state.errors.push(action.payload)
                return
            }
            
            state.userData = {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                personalInformation: {
                    id: action.payload.personID,
                    firstName: action.payload.person.firstName,
                }
            }
            state.auth.token = localStorage.getItem(TOKEN_KEY)
            state.auth.isAuth = true
            state.auth.roles = []
        })

        builder.addCase(getUserData.rejected, (state, action) => {
            if(action.payload instanceof ControlledError) {
                state.errors.push(action.payload)
                return
            }

            state.auth.isAuth = false
            state.auth.token = null
            state.auth.roles = []
            state.userData = undefined
            localStorage.removeItem(TOKEN_KEY)
        })
    }
})


export const { 
    setUserGeoLocation, resetGeoLocation,
    updateUserPersonalInformation, setUserPersonalInformation,
    logout
} = userSlice.actions 

export default userSlice.reducer