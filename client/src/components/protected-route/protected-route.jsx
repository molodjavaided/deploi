import { useSelector } from "react-redux";
import { ROLEID } from "../../constants/role-id";
import { checkAccess } from "../../utils/check-access";

export const ProtectedRoute = ({ className, children, access }) => {
  const userRole = useSelector(
    (state) => state.auth.user?.role ?? ROLEID.GUEST
  );

  const isAccess = checkAccess(access, userRole);

  if (!isAccess) {
    return (
      <div className={className}>
        <h2>Доступ запрещен</h2>
      </div>
    );
  }

  if (isAccess) {
    return children;
  }
};
