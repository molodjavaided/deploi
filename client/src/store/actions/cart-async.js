import { request } from "../../utils/request";
import { cartActions } from "./cart-actions";

export const fetchUserCart = () => async (dispatch) => {
    try {
        console.log('Fetching cart from server...');

        const cart = await request('/cart')

        console.log('Cart from server:', {
            itemsCount: cart.items?.length || 0,
            userId: cart.userId
        });


        dispatch(cartActions.setCart({
            items: cart.items || [],
            totalPrice: cart.totalPrice || 0,
            totalQuantity: cart.totalQuantity || 0,
            cartId: cart.id,
            userId: cart.userId
        }));
    } catch (error) {
        console.log("Корзина не нацдена", error);
        dispatch(cartActions.setCart({
            items: [],
            totalPrice: 0,
            totalQuantity: 0,
            cartId: null,
            userId: null
        }))
    }
}

export const addItemToCartServer = (productId, quantity = 1) => async (dispatch) => {
   try {
    const cart = await request('/cart/items', 'POST', { productId, quantity })
    dispatch(cartActions.setCart({
        items: cart.items || [],
        totalPrice: cart.totalPrice || 0,
        totalQuantity: cart.totalQuantity || 0,
        cartId: cart.id,
        userId: cart.userId
    }))
   } catch (error) {
    console.log('Ошибка добавления в корзину', error);
    throw error;
   }
};

export const updateQuantityServer = (productId, quantity) => async (dispatch) => {
    try {
        const cart = await request(`/cart/items/${productId}`, "PATCH", { quantity });
        dispatch(cartActions.setCart({
            items: cart.items || [],
            totalPrice: cart.totalPrice || 0,
            totalQuantity: cart.totalQuantity || 0,
            cartId: cart.id,
            userId: cart.userId
        }))
    } catch (error) {
        console.log('Ошибка обновления корзины', error);
        throw error;
    }
}

export const removeItemFromCartServer = (productId) => async (dispatch) => {
    try {
        const cart = await request(`/cart/items/${productId}`, 'DELETE');
        dispatch(cartActions.setCart({
            items: cart.items || [],
            totalPrice: cart.totalPrice || 0,
            totalQuantity: cart.totalQuantity || 0,
            cartId: cart.id,
            userId: cart.userId
        }))
    } catch (error) {
        console.log('Ошибка удаления из корзины', error);
        throw error;
    }
}

export const clearServerCart = () => async (dispatch) => {
    try {
        const cart = await request('/cart', "DELETE")
        dispatch(cartActions.setCart({
            items: cart.items || [],
            totalPrice: cart.totalPrice || 0,
            totalQuantity: cart.totalQuantity || 0,
            cartId: cart.id,
            userId: cart.userId
        }))
    } catch (error) {
        console.log('Ошибкв очистки корзины', error);
        throw error;
    }
}

export const makeOrder = () => async (dispatch) => {
    try {


        const response = await request('/cart/order', "POST")
        dispatch(cartActions.setCart({
            items: [],
            totalPrice: 0,
            totalQuantity: 0,
            cartId: null,
            userId: null
        }))

        return response

    } catch (error) {
        console.log('Ошибка оформления заказа', error);
        throw error;
    }
}