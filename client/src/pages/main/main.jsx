import { useEffect } from "react";
import styled from "styled-components";
import { Products } from "../../components/products/products";
import { Search } from "../../components/search/search";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProducts,
  productsActions,
  cartActions,
} from "../../store/actions";
import { CategoryFilter } from "../../components/category-filter/category-filter";
import { SortProducts } from "../../components/sort-products/sort-products";
import { Button } from "../../components";

const MainContainer = ({ className }) => {
  const {
    filteredItems: products,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    sortBy,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = (query) => {
    dispatch(productsActions.setSearchQuery(query));
  };

  const handleAddToCard = (product) => {
    dispatch(cartActions.addToCart(product));
    console.log(`Товар ${product.title} в корзине`);
  };

  const handleResetFilters = () => {
    dispatch(productsActions.resetFilters());
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || sortBy !== "default";

  return (
    <div className={className}>
      {/* поиск */}
      <Search onSearch={handleSearch} />

      <div className="wrapper">
        {/* категории */}
        <div className="filters-container">
          <CategoryFilter />
          <SortProducts />
          {hasActiveFilters && (
            <Button className="reset-filters" onClick={handleResetFilters}>
              Сбросить фильтр
            </Button>
          )}
        </div>

        {/* товары */}

        {isLoading ? (
          <div className="loading">Загрузка</div>
        ) : error ? (
          <div className="error">Ошибка {error}</div>
        ) : (
          <Products products={products} onAddCardBtn={handleAddToCard} />
        )}
      </div>

      {/* пагинация */}
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 40px;
  margin: 40px auto;

  .wrapper {
    display: flex;
    width: 100%;
    gap: 40px;
  }

  .filters-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 280px;
    flex-shrink: 0;
  }
`;
