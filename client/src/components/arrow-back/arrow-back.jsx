import styled from "styled-components";
import { Icon } from "../icon/icon";
import { icons } from "../icons/icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArrowBackContainer = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={className} onClick={handleClick}>
      <FontAwesomeIcon icon={icons.arrowBack} />
    </div>
  );
};

export const ArrowBack = styled(ArrowBackContainer)`
  position: fixed;
  left: 0;
  height: 100%;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.7s ease;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: var(--color-platinum);
  }

  & > svg {
    color: var(--color-silver);
    font-size: 1.5rem;
    transition: 0.7s ease;
  }

  &:hover svg {
    color: var(--color-black);
  }

  /* Мобильные стили */
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    top: 120px;
    left: 10px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);

    & > svg {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    top: 100px;
    left: 5px;

    & > svg {
      font-size: 1rem;
    }
  }
`;
