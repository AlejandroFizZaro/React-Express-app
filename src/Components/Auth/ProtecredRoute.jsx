import { Outlet, Navigate, redirect, useLoaderData } from "react-router-dom";
import { removeToken, isTokenExpired, checkToken}  from './UseTokenAuth';

export async function action ({ request, params }) {
  
}

export async function loader ({ request, params }) {
  const token = checkToken().then((tokenCode) => {
    return(tokenCode);
  });

  const expired = isTokenExpired().then((expiredStatus) => {
    return(expiredStatus);
  })

  return { token, expired };
}

export default function ProtectedRoute() {
  const { token, expired } = useLoaderData();
  // if there's no token, the user is redirected to '/'
  if (!token || expired === true  ) {
    removeToken();

    return <Navigate to='/' replace/>;
  }
  // Once the token is in place --> return child elements
  return <Outlet/>;
};