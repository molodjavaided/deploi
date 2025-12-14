import styled from "styled-components";
import { getNameCategory } from "../../utils/getNameCategory";
import { Button } from "../button/button";

const ProductsAdminListContainer = ({
  className,
  products,
  categories = [],
  onEdit,
  onDelete,
  onAddProduct,
  onAddCategory,
}) => {
  return (
    <div className={className}>
      <div className="buttons">
        <Button onClick={onAddProduct}>Добавить товар</Button>
        <Button onClick={onAddCategory}>Добавить категорию</Button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th className="column-category">Категория</th>
            <th className="column-title">Название</th>
            <th className="column-description">Описание</th>
            <th className="column-price">Цена</th>
            <th className="column-quantity">Количество</th>
            <th className="column-stock">Наличие</th>
            <th className="column-buttons"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id || product._id} className="product-row">
              <td className="product-category">
                {getNameCategory(categories, product.categoryId)}
              </td>
              <td className="product-title">{product.title}</td>
              <td className="product-description">{product.description}</td>

              <td className="product-price">{product.price}</td>
              <td className="product-quantity">{product.quantity} шт</td>
              <td className="product-stock">
                {product.inStock ? "В наличии" : "Нет в наличии"}
              </td>
              <td className="product-buttons">
                <Button onClick={() => onEdit(product)}>Редактировать</Button>
                <Button onClick={() => onDelete(product.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ProductsAdminList = styled(ProductsAdminListContainer)`
  .products-table {
    width: 100%;
    border-spacing: 0 10px;
    margin: 20px 0;
    border-collapse: separate;
  }

  .products-table th,
  .products-table td {
    text-align: center;
    padding: 0 5px;
  }

  .products-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .products-table tr:hover {
    background-color: #f1f1f1;
  }

  .buttons {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-buttons {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: space-between;
  }

  .column-category {
    width: 10%;
  }
  .column-title {
    width: 15%;
  }
  .product-description {
    text-align: left;
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .column-price {
    width: 10%;
  }

  column-quantity {
    width: 8%;
  }

  .column-stock {
    width: 10%;
  }
`;
