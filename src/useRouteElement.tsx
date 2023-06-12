import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import RegisterLayout from './layout/RegisterLayout';
// import Login from './page/Login';
// import ProductList from './page/ProductList';
// import Register from './page/Register';
import MainLayout from './layout/MainLayout';
import { path } from 'src/constant/path';
// import ProductDetail from './page/ProductDetail';
// import Cart from './page/Cart';
import CartLayout from './layout/CartLayout';
import UserLayout from './page/User/layout/UserLayout';
// import ChangePassword from './page/User/pages/ChangePassword';
// import HistoryPurchase from './page/User/pages/HistoryPurchase';
// import Profile from './page/User/pages/Profile';
// import PageNotFound from './page/PageNotFound';
import { useVerifyIsLogin } from './hooks/useVerifyIsLogin';

const Login = lazy(() => import('./page/Login'));
const ProductList = lazy(() => import('./page/ProductList'));
const Register = lazy(() => import('./page/Register'));
const ProductDetail = lazy(() => import('./page/ProductDetail'));
const Cart = lazy(() => import('./page/Cart'));
const ChangePassword = lazy(() => import('./page/User/pages/ChangePassword'));
const HistoryPurchase = lazy(() => import('./page/User/pages/HistoryPurchase'));
const Profile = lazy(() => import('./page/User/pages/Profile'));
const PageNotFound = lazy(() => import('./page/PageNotFound'));

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
                <Suspense>
                  <Profile />
                </Suspense>
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: path.changePassword,
          element: (
            <MainLayout>
              <UserLayout>
                <Suspense>
                  <ChangePassword />
                </Suspense>
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: path.historyPurchase,
          element: (
            <MainLayout>
              <UserLayout>
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
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
              <Suspense>
                <Cart />
              </Suspense>
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
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
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.detail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <PageNotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ]);

  return routeElement;
}
