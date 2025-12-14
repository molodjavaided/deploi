import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { productsActions } from "../../store/actions";

const SortProductsConateiner = ({ className }) => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.products);

  const handleSortChange = (event) => {
    dispatch(productsActions.setSortBy(event.target.value));
  };

  return (
    <div className={className}>
      <h2 className="sort-title">Сортировка</h2>

      <select value={sortBy} onChange={handleSortChange}>
        <option value="default">По умолчанию</option>
        <option value="price_asc">По возрастанию</option>
        <option value="price_desc">По убыванию</option>
      </select>
    </div>
  );
};

export const SortProducts = styled(SortProductsConateiner)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;

  .sort-title {
    text-align: center;
    margin: 0;
  }
  select {
    font-family: var(--font-primary);
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    padding: 12px 15px;
    border-radius: 10px;
    border: none;
    width: ${({ width = "100%" }) => width};
    background-color: var(--color-silver);
    color: var(--color-black);
    cursor: pointer;
    transition: all 0.3s;
    outline: none;
  }
`;
