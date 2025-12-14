export const sortsProducts = (products, sortBy) => {
    const sorted = [...products];

    switch (sortBy) {
        case 'price_asc':
            return sorted.sort((a,b) => a.price - b.price);

        case 'price_desc':
            return sorted.sort((a,b) => b.price - a.price);

        case "default":
            default:
                return sorted;
    }
}