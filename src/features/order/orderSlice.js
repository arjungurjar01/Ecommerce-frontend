import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder } from './orderApi';
// Initial state
const initialState = {

  orders : [] ,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  currentOrder : null,
};

// Async thunks
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
   
      const response = await createOrder(order);
      return response.data;
    
    
  }
);

// order slice
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      resetOrder: (state) => {
          state.currentOrder = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders.push(action.payload);
          state.currentOrder = action.payload;
          
        });
    },
  });
  
  export const { resetOrder} = orderSlice.actions;
  
  // export const selectAddToCart = (state) => state.cart.value;
  
  export const selectCurrentOrder = (state) => state.order.currentOrder;
  
  export default orderSlice.reducer;