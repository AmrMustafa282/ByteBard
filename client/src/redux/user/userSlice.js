import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUesr: null,
  error: null,
  loading: false,
  done:false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action)=> {
      state.currentUesr = action.payload;
      state.loading = false,
        state.error = null
      state.done = true;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
  }
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;