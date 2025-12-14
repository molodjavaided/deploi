import styled from "styled-components";
import { Product } from "../product/product";

const ProductsContainer = ({ className, products, onAddCardBtn }) => {
  if (products.length === 0) {
    return <div>Товары не найдены</div>;
  }

  return (
    <div className={className}>
      {products.map((product) => (
        <Product
          key={product.id || product._id}
          product={product}
          onAddCardBtn={onAddCardBtn}
        />
      ))}
    </div>
  );
};

export const Products = styled(ProductsContainer)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
}
`;
