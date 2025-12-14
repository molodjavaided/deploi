import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "react-router-dom";

const IconContainer = ({ to = "/", icon, className, count = 0 }) => {
  return (
    <Link to={to} className={className}>
      <FontAwesomeIcon icon={icon} />
      {count > 0 && <span className="icon-count">{count}</span>}
    </Link>
  );
};

export const Icon = styled(IconContainer)`
  color: var(--color-silver);
  font-size: 1.5rem;
  transition: 0.3s;
  position: relative;
  text-decoration: none;
  display: inline-flex;

  &:hover {
    color: var(--color-platinum);
    transform: scale(110%);
  }

  .icon-count {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #ff4444;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    padding: 0;
  }
`;
