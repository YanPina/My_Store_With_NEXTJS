import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        hydrate: (state, action) => {
            return action.payload
        },
        //Funções da loja
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex((cartItem) => cartItem.id === action.payload.id
            );

            let newCart = [...state.items];

            if (index >= 0) {
                newCart.splice(index, 1)
            } else {
                console.warn(`Cant remove product (id: ${state.payload.id}) as its not in cart!`);
            }

            state.items = newCart;
        },
        removeGroupedFromCart: (state, action) => {
            let newCart = state.items.filter(
                (cartItem) => cartItem.id !== action.payload.id
            );
            state.items = newCart;
        },
        clearCart: (state, action) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, removeGroupedFromCart, hydrate, clearCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;