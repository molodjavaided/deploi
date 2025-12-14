import { ACTION_TYPE } from "../actions/actions-type"
import { calculateTotals } from "../helpers/calculate-totals";

const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    cartId: null,
    userId: null
}

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPE.ADD_TO_CART:
           { const { product, quantity = 1 } = action.payload;

           let newItems;

           const isItemInCartIndex = state.items.findIndex(item => item.productId === product.id)

           if (isItemInCartIndex >= 0) {
                newItems = state.items.map((item, index) => {
                    if (index === isItemInCartIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity,
                            totalPrice: (item.quantity + quantity) * item.price
                        }
                    }
                    return item
                })
           } else {
                newItems = [
                    ...state.items,
                    {
                        productId: product.id,
                        title: product.title,
                        description: product.description,
                        imageUrl: product.imageUrl,
                        inStock: product.inStock,
                        quantity: quantity,
                        price: product.price,
                        totalPrice: product.price * quantity,
                        addedAt: new Date().toISOString()
                    }
                ]
            }

            const { totalQuantity, totalPrice } = calculateTotals(newItems);

            return  {
                ...state,
                items: newItems,
                totalQuantity,
                totalPrice
            } }

        case ACTION_TYPE.REMOVE_FROM_CART:
            { const productIdToRemove = action.payload;

            const filteredItems = state.items.filter(
                item => item.productId !== productIdToRemove
            )

            const totalsAfterRemove = calculateTotals(filteredItems);

            return {
                ...state,
                items: filteredItems,
                ...totalsAfterRemove
            } }


        case ACTION_TYPE.UPDATE_QUANTITY:

            { const { productId, quantity: newQuantity } = action.payload;

            const updatedItems = state.items.map(item => {
                if (item.productId === productId && newQuantity > 0) {
                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: newQuantity * item.price
                    }
                }
                return item;
            }).filter(item => item.quantity > 0);

            const totalsAfterUpdate = calculateTotals(updatedItems)

            return {
                ...state,
                items: updatedItems,
                ...totalsAfterUpdate
            } }

        case ACTION_TYPE.CLEAR_CART:
            return {
                ...state,
                items: [],
                totalPrice: 0,
                totalQuantity: 0
            }

        case ACTION_TYPE.SET_CART:
            return {
                ...action.payload
            }

        case ACTION_TYPE.SET_CART_USER:
            return {
                ...state,
                userId: action.payload.userId,
                cartId: action.payload.cartId
            }

        default:
            return state;
    }
}