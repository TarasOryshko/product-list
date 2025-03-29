import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  imageUrl: string | undefined;
  id: string;
  name: string;
  count: number;
  description: string;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
