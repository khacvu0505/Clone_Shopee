import React from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import RegisterLayout from './layout/RegisterLayout';
import Login from './page/Login';
import ProductList from './page/ProductList';
import Register from './page/Register';
import MainLayout from './layout/MainLayout';
import { path } from 'src/constant/path';
import ProductDetail from './page/ProductDetail';
import Cart from './page/Cart';
import CartLayout from './layout/CartLayout';
import UserLayout from './page/User/layout/UserLayout';
import ChangePassword from './page/User/pages/ChangePassword';
import HistoryPurchase from './page/User/pages/HistoryPurchase';
import Profile from './page/User/pages/Profile';
import PageNotFound from './page/PageNotFound';
import { useVerifyIsLogin } from './hooks/useVerifyIsLogin';

// If user logged in => Navigate to page
// Else navigate to login
const ProtectedRoute = () => {
  const islogin = useVerifyIsLogin();
  return islogin ? <Outlet /> : <Navigate to='/login' />;
};

// If user logged in => Navigate to home page
// Else navigate to login or register page
const RejectedRoute = () => {
  const islogin = useVerifyIsLogin();
  return !islogin ? <Outlet /> : <Navigate to='/' />;
};

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: path.user,
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <UserLayout>
                <Profile />
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: path.changePassword,
          element: (
            <MainLayout>
              <UserLayout>
                <ChangePassword />
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: path.historyPurchase,
          element: (
            <MainLayout>
              <UserLayout>
                <HistoryPurchase />
              </UserLayout>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.detail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <PageNotFound />
        </MainLayout>
      )
    }
  ]);

  return routeElement;
}
