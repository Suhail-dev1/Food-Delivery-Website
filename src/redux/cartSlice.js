import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    AddItem: (state, action) => {
      const existItem = state.find(item => item.id === action.payload.id);
      if (existItem) {
        existItem.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },
    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    incrementQty: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) {
        item.qty += 1;
      }
    },
    decrementQty: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    }
  }
});

export const { AddItem, removeItem, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
