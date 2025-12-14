import { useState } from "react";
import styled from "styled-components";
import { Button } from "../button/button";
import { Input } from "../input/input";

const CategoryFormContainer = ({
  className,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name });
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <h2>Добавить категорию</h2>

      <div className="input-wrapper">
        <label>Название категории</label>
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Введите название категории"
          required
        />
      </div>

      <div className="buttons">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Сохранение..." : "Сохранить"}
        </Button>
        <Button type="button" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};

export const CategoryForm = styled(CategoryFormContainer)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
    text-align: center;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
`;
