import { useState } from "react";
import styled from "styled-components";
import { Button } from "../button/button";
import { Input } from "../input/input";

const ProductFormContainer = ({
  className,
  product,
  categories,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    imageUrl: product?.imageUrl || "",
    categoryId: product?.categoryId || "",
    inStock: product?.inStock ?? true,
    quantity: product?.quantity || 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  const handleInStock = (value) => {
    setFormData((data) => ({
      ...data,
      inStock: value,
      ...(value === false ? { quantity: 0 } : {}),
    }));
  };

  if (isLoading) {
    return <div className={className}>Загрузка</div>;
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label>Название товара</label>
        <Input
          type="text"
          value={formData.title}
          placeholder="Название товара"
          onChange={(event) =>
            setFormData((data) => ({ ...data, title: event.target.value }))
          }
          required
        />
      </div>
      <div className="input-wrapper">
        <label>Описание товара</label>
        <Input
          type="text"
          value={formData.description}
          placeholder="Описание товара"
          onChange={(event) =>
            setFormData((data) => ({
              ...data,
              description: event.target.value,
            }))
          }
          required
        />
      </div>
      <div className="input-wrapper">
        <label>Цена товара</label>
        <Input
          type="text"
          value={formData.price}
          placeholder="Цена товара"
          onChange={(event) =>
            setFormData((data) => ({ ...data, price: event.target.value }))
          }
          required
        />
      </div>
      <div className="input-wrapper">
        <label>Количество на складе</label>
        <Input
          type="number"
          min="0"
          value={formData.quantity}
          placeholder="Количество"
          onChange={(event) => {
            const qty = Number(event.target.value);
            setFormData((data) => ({
              ...data,
              quantity: qty,
              inStock: qty > 0,
            }));
          }}
          required
        />
      </div>
      <div className="input-wrapper">
        <label>Ссылка на фото товара</label>
        <Input
          type="text"
          value={formData.imageUrl}
          placeholder="Ссылка на фото товара"
          onChange={(event) =>
            setFormData((data) => ({ ...data, imageUrl: event.target.value }))
          }
          required
        />
      </div>
      <div className="input-wrapper">
        <label>Категория товара</label>
        <select
          value={formData.categoryId}
          onChange={(event) =>
            setFormData((data) => ({ ...data, categoryId: event.target.value }))
          }
        >
          <option value="">Выберите категорию</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-wrapper">
        <label>Наличие товара</label>

        <div className="buttons">
          <Button
            type="button"
            className={`stock-btn ${formData.inStock ? "active" : ""}`}
            onClick={() => handleInStock(true)}
          >
            В наличии
          </Button>
          <Button
            type="button"
            className={`stock-btn ${!formData.inStock ? "active" : ""}`}
            onClick={() => handleInStock(false)}
          >
            Нет в наличии
          </Button>
        </div>
      </div>
      <div className="buttons">
        <Button type="submit">Сохранить</Button>
        <Button type="button" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};

export const ProductForm = styled(ProductFormContainer)`
  display: flex;
  width: 100%;
  gap: 20px;
  flex-direction: column;

  select {
    font-family: var(--font-primary);
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    padding: 12px 15px;
    border-radius: 10px;
    border: none;
    width: 500px;
    background-color: var(--color-silver);
    color: var(--color-black);
    cursor: pointer;
    transition: all 0.3s;
    outline: none;
  }

  .input-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  Input {
    width: 500px;
  }

  .stock-btn {
    &.active {
      background-color: var(--color-black);
      color: var(--color-silver);
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
