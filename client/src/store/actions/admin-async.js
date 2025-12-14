import { request } from "../../utils/request"
import { adminActions } from "./admin-actions";

export const addProductToServer = (product) => async (dispatch) => {
    try {
        const newProduct = await request('/product', 'POST', product);

        dispatch(adminActions.addProduct(newProduct));
        return newProduct

    } catch (error) {
        console.log("Товар не добавлен в каталог");
        throw error;
    }
}

export const updateProductToServer = (product) => async (dispatch) => {
    try {
        const updateProduct = await request(`/product/${product.id}`, 'PATCH', product)
        dispatch(adminActions.updateProduct(updateProduct))
        return updateProduct
    } catch (error) {
        console.log("Товар не изменен в каталоге");
        throw error;
    }
}

export const deleteProductFromServer = (productId) => async (dispatch) => {
    try {
        await request(`/product/${productId}`, 'DELETE')
        dispatch(adminActions.deleteProduct(productId))
    } catch (error) {
        console.log("Товар не удален в каталоге");
        throw error;
    }
}

export const addCategoryToServer = (category) => async (dispatch) => {
    try {
        const newCategory = await request('/category', 'POST', category)
        dispatch(adminActions.addCategory(newCategory))
        return newCategory
    } catch (error) {
        console.log('Категория не добавлена', error.message);
    }
}