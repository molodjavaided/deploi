import { sortsProducts } from "./sort-products";

export const applyFilters = (state) => {
    let filtered = [...state.items]

    if (state.searchQuery) {
        filtered = filtered.filter(product => product.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }

    if (state.selectedCategory) {
        filtered = filtered.filter(product => product.categoryId === state.selectedCategory);
    }

    filtered = sortsProducts(filtered, state.sortBy)

    return filtered;
}
