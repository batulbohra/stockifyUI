import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    // Reducer comes here
    login:(state,action)=>{
      state.user=action.payload;
    },
    logout:(state)=>{
      state.user=null;
    }

  },
  extraReducers: {
    // Extra reducer comes here
  },
});

export const {login,logout}=userSlice.actions;
export const selectUser=(state)=> state.user.user;
export default userSlice.reducer;