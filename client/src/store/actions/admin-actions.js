import { ACTION_TYPE } from "./actions-type";

export const adminActions = {
    addProduct: (product) => ({
        type: ACTION_TYPE.ADD_PRODUCT,
        payload: product
    }),

    updateProduct: (product) => ({
        type: ACTION_TYPE.UPDATE_PRODUCT,
        payload: product
    }),

    deleteProduct: (productId) => ({
        type: ACTION_TYPE.DELETE_PRODUCT,
        payload: productId
    }),

    setEditProduct: (product) => ({
        type: ACTION_TYPE.SET_EDIT_PRODUCT,
        payload: product
    }),
    addCategory: (category) => ({
    type: ACTION_TYPE.ADD_CATEGORY,
    payload: category,
  }),

}