import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../../store/actions";
import styled from "styled-components";
import { Button } from "../button/button";

const CategoryFilterContainer = ({ className }) => {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(
    (state) => state.products
  );

  const handleCategoryChange = (categoryId) => {
    dispatch(productsActions.setCategory(categoryId));
  };

  return (
    <div className={className}>
      <h2 className="category-title">Категории</h2>

      <div className="categories">
        <Button
          key="all"
          className={!selectedCategory ? "category-btn active" : "category-btn"}
          onClick={() => handleCategoryChange(null)}
        >
          Все товары
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id || category._id}
            className={
              selectedCategory === (category.id || category._id)
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => handleCategoryChange(category.id || category._id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const CategoryFilter = styled(CategoryFilterContainer)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;

  .category-title {
    text-align: center;
    margin: 0;
  }

  .categories {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .category-btn.active {
    background-color: var(--color-black);
    color: var(--color-silver);
  }
`;
