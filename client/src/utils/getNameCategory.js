// export const getNameCategory = (categories, categoryId) => {
//     const category = categories.find(category => category.id === categoryId)

//     return category.name
// }

export const getNameCategory = (categories = [], categoryId) => {
    if (!categories || !Array.isArray(categories) || !categoryId) {
        return "Без категории";
    }

    // Ищем категорию - учитываем разные форматы
    const category = categories.find(cat => {
        // Проверяем все возможные варианты id
        return (cat.id && cat.id.toString() === categoryId.toString()) ||
               (cat._id && cat._id.toString() === categoryId.toString());
    });

    return category && category.name ? category.name : "Без категории";
};