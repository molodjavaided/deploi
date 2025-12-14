import { request } from "../../utils/request"
import { productsActions } from "./products-actions"

export const fetchProducts = () => async (dispatch) => {
    dispatch(productsActions.fetchProductsStart())

    try {
        const response = await request('/product')
        dispatch(productsActions.fetchProductsSucces(response.products || []))
    } catch (error) {
        dispatch(productsActions.fetchProductsError(error.message))
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        const categories = await request('/category')

        dispatch(productsActions.fetchCategorySuccess(categories))
    } catch (error) {
        console.log(error);
    }
}