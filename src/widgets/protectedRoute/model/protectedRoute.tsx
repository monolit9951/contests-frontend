import { FC } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// import { RootState } from "../store";

interface ProtectedRouteInterface {
  role?: 'USER' | 'ADMIN';
  auth?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteInterface> = ({ role, auth }) => {
  const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
  const user = useTypeSelector((state) => state.user);

  // Если требуется определенная роль
  if (role) {
    if (user.role !== role) {
      return <Navigate to="/feed" replace />;
    }
    return <Outlet />;
  }

  // Если требуется авторизация
  if (auth) {
    if (!user.userId) {
      return <Navigate to="/feed?auth=false" replace />;
    }
    return <Outlet />;
  }

  // Если не требуется ни авторизация, ни роль
  return <Outlet />;
};

export default ProtectedRoute;