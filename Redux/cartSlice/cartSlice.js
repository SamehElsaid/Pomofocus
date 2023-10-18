import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
};
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    SET_CART: (state, action) => {
      state.data = action.payload;
    },
    REMOVE_CART: (state, action) => {
      state.data = null;
    },
  },
});
export let { SET_CART, REMOVE_CART } = cart.actions;
export default cart.reducer;
