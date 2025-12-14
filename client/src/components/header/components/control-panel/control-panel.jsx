import { icons } from "../../../icons/icons";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../store/actions/auth-async";

const RightAligned = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ControlPanelContainer = ({ className }) => {
  const { user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className={className}>
      <RightAligned>
        {user ? (
          <Icon to="/cart" icon={icons.bag} count={totalQuantity} />
        ) : null}

        {user ? (
          <div className="user__info">
            <div className="user__login">{user.login}</div>
            <button onClick={onLogout}>
              <Icon to={"/auth/logout"} icon={icons.logOut} />
            </button>
          </div>
        ) : (
          <Icon to={"/login"} icon={icons.user} />
        )}
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  .user__info {
    display: flex;
    align-items: center;
    gap: 10px;
    & button {
      background-color: inherit;
      border: none;
    }
  }
  .user__login {
    color: #fff;
  }
`;
