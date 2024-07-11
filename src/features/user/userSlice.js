import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  fetchLoggedInUserOrders } from './userApi';

// Initial state
const initialState = {
   userOrders : [], 
  userInfo : 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  
};

// Async thunks


export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async (id) => {
     
        const response = await fetchLoggedInUserOrders(id);
        return response.data;
    }
  );  

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      increment: (state) => {
          state.value += 1;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.userOrders = action.payload;
          
        });
    },
  });
  
  export const { increment} = userSlice.actions;
  
  // export const selectAddToCart = (state) => state.cart.value;
  
  export const selectUserOders = (state) => state.user.userOrders;
  
  export default userSlice.reducer;  