import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import type { Profile } from "../account/profile";

interface IAuth {
  user: Profile | null | undefined,
}

const initialState: IAuth = {
  user: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    login: (state, action: PayloadAction<Profile>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
})

export const { login, logout } = authSlice.actions
export const selectUser = (state: RootState) => state.auth.user
export default authSlice.reducer
