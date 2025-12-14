export const calculateTotals = (items) => {
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0)

    return { totalQuantity, totalPrice }
}