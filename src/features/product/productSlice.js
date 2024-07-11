import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts ,fetchProductsByFilters ,fetchAllBrands,fetchAllCategories, fetchProductById} from './productApi.js';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems :0,
  selectedProduct:null,
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload 
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    console.log("res data",response.data);
    // The value we return becomes the `fulfilled` action payload 
    return response.data;
    
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort, pagination );
    // The value we return becomes the `fulfilled` action payload
    const totalItems = response.data.products.length  ? response.data.products.length : 0; 
    console.log('res data fetch filters :' ,response.data);
    return { ...response.data, totalItems };
    // return  response.data
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload 
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload 
    console.log('res all categories :' ,response.data);
    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;

      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export const selectTotalItems = (state) => state.product.totalItems;

export const selectAllBrands = (state) => state.product.brands;

export const selectAllCategories = (state) => state.product.categories;

export const selectProductById = (state) => state.product.selectedProduct;


export default productSlice.reducer;