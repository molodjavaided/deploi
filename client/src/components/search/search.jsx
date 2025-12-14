import styled from "styled-components";
import { Input } from "../input/input";
import { useState } from "react";

const SearchContainer = ({ className, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Поиск товара"
      />
    </form>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  width: 100%;
  max-width: 800px;
  }
`;
