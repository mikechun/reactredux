import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuth {
  googleToken: string,
}

const initialState: IAuth = {
  googleToken: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    authGoogle: (state, action: PayloadAction<string>) => {
      state.googleToken = action.payload
    },
    logout: (state) => {
      state.googleToken = ''
    }
  }
})

export const { authGoogle, logout } = authSlice.actions
export default authSlice.reducer
