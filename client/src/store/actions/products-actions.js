import { ACTION_TYPE } from "./actions-type";

export const productsActions = {
fetchProductsStart: () => ({ type: ACTION_TYPE.FETCH_PRODUCTS_START }),

fetchProductsSucces: (products) => ({ type: ACTION_TYPE.FETCH_PRODUCTS_SUCCES, payload: products }),

fetchProductsError: (error) => ({ type: ACTION_TYPE.FETCH_PRODUCTS_ERROR, payload: error }),

fetchCategorySuccess: (categories) => ({ type: ACTION_TYPE.FETCH_CATEGORY_SUCCES, payload: categories }),

setSearchQuery: (query) => ({ type: ACTION_TYPE.SET_SEARCH_QUERY, payload: query }),

setCategory: (categoryId) => ({ type: ACTION_TYPE.SET_CATEGORY, payload: categoryId }),

setSortBy: (sortBy) => ({type: ACTION_TYPE.SET_SORT_BY, payload: sortBy }),

resetFilters: () => ({ type: ACTION_TYPE.RESET_FILTERS })
}
