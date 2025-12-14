import { ACTION_TYPE } from "./actions-type";

export const cartActions = {
    addToCart: (product, quantity = 1) => ({
        type: ACTION_TYPE.ADD_TO_CART,
        payload: { product, quantity }
    }),

    removeFromCart: (productId) => ({
        type: ACTION_TYPE.REMOVE_FROM_CART,
        payload: productId
    }),

    updateQuantity: (productId, quantity) => ({
        type: ACTION_TYPE.UPDATE_QUANTITY,
        payload: { productId,quantity }
    }),

    setCart: (cartData) => ({
        type: ACTION_TYPE.SET_CART,
        payload: cartData
    }),

    setCartUser: (userId, cartId) => ({
        type: ACTION_TYPE.SET_CART_USER,
        payload: { userId, cartId }
    }),

    clearCart: () => ({
        type: ACTION_TYPE.CLEAR_CART
    })
}