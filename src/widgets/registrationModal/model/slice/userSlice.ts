import { createSlice , PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    userName: null | string
    userProfileImg: null | string
    userLogin: null | string
    role: null | string
}

const initialState: UserState = {
    userName: null,
    userProfileImg: null,
    userLogin: null,
    role: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.userName = action.payload.userName
            state.userProfileImg = action.payload.userProfileImg
            state.userLogin = action.payload.userLogin
            state.role = action.payload.role
        },

        clearUser: (state)=>{
            state.userName = null
            state.userProfileImg = null
            state.userLogin = null
            state.role = null
        }
    }
})

export const {setUser, clearUser} = userSlice.actions
export default userSlice.reducer