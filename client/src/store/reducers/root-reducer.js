import { combineReducers } from "redux";
import { productsReducer } from "./products-reducer";
import { cartReducer } from "./cart-reducer";
import { authReducer } from "./auth-reducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer
})