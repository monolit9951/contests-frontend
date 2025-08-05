import { createSlice , PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    userName: null | string
    userProfileImg: null | string
    userLogin: null | string
    userRole: null | string
    userId: null | string
}

const initialState: UserState = {
    userName: null,
    userProfileImg: null,
    userLogin: null,
    userRole: null,
    userId: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.userName = action.payload.userName
            state.userProfileImg = action.payload.userProfileImg
            state.userLogin = action.payload.userLogin
            state.userRole = action.payload.userRole
            state.userId = action.payload.userId
        },

        clearUser: (state)=>{
            state.userName = null
            state.userProfileImg = null
            state.userLogin = null
            state.userRole = null
            state.userId = null
        }
    }
})

export const {setUser, clearUser} = userSlice.actions
export default userSlice.reducer