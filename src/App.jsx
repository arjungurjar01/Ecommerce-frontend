import { useEffect, useState } from 'react'
import { store } from './app/store.js'
import { Provider, useDispatch, useSelector } from 'react-redux'
import './App.css'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Protected from './features/auth/Protected.jsx'
import { selectLoggedInUser } from './features/auth/authSlice.js'
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice.js'
import PageNotFound from './pages/PageNotFound.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
import UserOrders from './features/user/UserOrders.jsx'
// import { positions, Provider } from 'react-alert';

const router = createBrowserRouter([
  {
    path: "/",
    element: (  <Home/>
    ),
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element: <Protected> <CartPage/> </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected> <CheckoutPage/> </Protected>,
  },
  {
    path: `/product-detail/:id`,
    element: <Protected> <ProductDetailPage/> </Protected>,
  },
  {
    path: "order-success/:id",
    element:  <OrderSuccessPage/> ,
  },
  {
    path: "orders",
    element:  <UserOrders/> ,
  },
  {
    path: "*",
    element:  <PageNotFound/> ,
  },
]);


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch,user]);

  return (
    <>
      
      <RouterProvider router={router} />

      {/* <Provider store={store}>
      <RouterProvider router={router} />
    </Provider> */}
       
    </>
  )
}

export default App
