import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};
