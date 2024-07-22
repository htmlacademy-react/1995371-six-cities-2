import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: React.JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps): React.JSX.Element {
  const currentAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return (
    currentAuthorizationStatus === AuthorizationStatus.NoAuth
      ? <Navigate to={AppRoute.Login} />
      : children
  );
}
