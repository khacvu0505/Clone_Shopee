import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layout/RegisterLayout'
import Login from './page/Login'
import ProductList from './page/ProductList'
import Register from './page/Register'
import MainLayout from './layout/MainLayout'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/constant/path'
import ProductDetail from './page/ProductDetail'
import Cart from './page/Cart'
import CartLayout from './layout/CartLayout'

function ProtectedRoute() {
  const { isAuthenticated } = React.useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = React.useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          )
        },
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
    }
  ])

  return routeElement
}
