import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
  
};
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.data = action.payload;
    },
    REMOVE_USER: (state, action) => {
      state.data = null;
    },
  },
});
export let { SET_ACTIVE_USER, REMOVE_USER } = auth.actions;
export default auth.reducer;
