import { ACTION_TYPE } from "../actions/actions-type"
import { applyFilters } from "../helpers/apply-filters"

const initialState = {
    items: [],
    filteredItems: [],
    categories: [],
    searchQuery: '',
    selectedCategory: null,
    sortBy: 'default',
    isLoading: false,
    error: null,
    editProduct: null
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.FETCH_PRODUCTS_START: return {
            ...state,
            isLoading: true,
            error: null
        }

        case ACTION_TYPE.FETCH_PRODUCTS_SUCCES: return {
            ...state,
            isLoading: false,
            items: action.payload,
            filteredItems: action.payload,
            error: null
        }

        case ACTION_TYPE.FETCH_PRODUCTS_ERROR: return {
            ...state,
            isLoading: false,
            error: action.payload
        }

        case ACTION_TYPE.FETCH_CATEGORY_SUCCES: return {
            ...state,
            categories: action.payload
        }

        case ACTION_TYPE.SET_SEARCH_QUERY:

            { const newStateWithSearch = {
                ...state,
                searchQuery: action.payload
            }

            return {
                ...newStateWithSearch,
                filteredItems: applyFilters(newStateWithSearch)
            } }

        case ACTION_TYPE.SET_CATEGORY:

            { const newStateWithCategory = {
                ...state,
                selectedCategory: action.payload
            }

            return {
                ...newStateWithCategory,
                filteredItems: applyFilters(newStateWithCategory)
            } }

        case ACTION_TYPE.SET_SORT_BY:

            { const newStateWithSort = {
                ...state,
                sortBy: action.payload
            }
            return {
                ...newStateWithSort,
                filteredItems: applyFilters(newStateWithSort)
            } }

        case ACTION_TYPE.RESET_FILTERS: return {
            ...state,
            searchQuery: '',
            selectedCategory: null,
            sortBy: 'default',
            filteredItems: state.items
        }

        case ACTION_TYPE.ADD_PRODUCT:

            { const newItems = [...state.items, action.payload]

            return {
                ...state,
                items: newItems,
                filteredItems: applyFilters({ ...state, items: newItems})
            } }

        case ACTION_TYPE.UPDATE_PRODUCT:

        { const updatedItems = state.items.map(item =>
                item.id === action.payload.id ? action.payload : item
            )
            return {
                ...state,
                items: updatedItems,
                filteredItems: applyFilters({ ...state, items: updatedItems }),
                editProduct: null
            } }

        case ACTION_TYPE.DELETE_PRODUCT:
            { const itemsAfterDelete = state.items.filter(item => item.id !== action.payload)

            return {
                ...state,
                items: itemsAfterDelete,
                filteredItems: applyFilters({ ...state, items: itemsAfterDelete })
            } }

        case ACTION_TYPE.SET_EDIT_PRODUCT:
            return {
                ...state,
                editProduct: action.payload
            }

        case ACTION_TYPE.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        default:
            return state;
    }
}