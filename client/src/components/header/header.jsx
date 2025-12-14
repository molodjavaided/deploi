import styled from "styled-components";
import { ControlPanel, Logo } from "./components";
import { Link } from "react-router-dom";
import { ROLEID } from "../../constants/role-id";
import { ProtectedRoute } from "../protected-route/protected-route";

const HeaderContainer = ({ className }) => {
  return (
    <header className={className}>
      <section>
        <Link to="/">
          <Logo />
        </Link>

        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <ProtectedRoute access={[ROLEID.ADMIN]}>
                <Link to="/admin">Админ Панель</Link>
              </ProtectedRoute>
            </li>
          </ul>
        </nav>

        <ControlPanel />
      </section>
    </header>
  );
};

export const Header = styled(HeaderContainer)`
  position: fixed;
  height: 150px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--color-black);

  section {
    width: min(var(--width-desktop), 100% - 2rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
  }

  nav ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    gap: clamp(2rem, 8vw, 10rem); /* Адаптивный gap */
  }

  nav a {
    display: flex;
    color: var(--color-silver);
    align-items: center;
    text-decoration: none;

    &:hover {
      color: var(--color-platinum);
      transition: 0.3s;
      transform: scale(120%);
    }
  }

  @media (max-width: 768px) {
    height: 120px;

    section {
      width: 100%;
      padding: 0 var(--spacing-xs);
    }

    nav ul {
      gap: var(--spacing-lg);
    }
  }

  @media (max-width: 480px) {
    height: 100px;

    nav ul {
      gap: var(--spacing-md);
    }
  }
`;
