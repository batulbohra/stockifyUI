import logo from './logo.svg';
import './App.css';
import SignUp from './pages/authentication/SignUp';
import SignIn from './pages/authentication/SignIn';

import Dashboard from './pages/dashboard/Dashboard';
import Holdings from './pages/holdings/Holdings';
import { Routes, Route } from "react-router-dom"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MarketStatus from './pages/marketStatus/MarketStatus';
import History from './pages/transactionHistory/History';


const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/Signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Dashboard/>,
    children: [
      {
        path: "/home/dashboard",
        element: <MarketStatus />,
      },
      {
        path: "/home/holding",
        element: <Holdings />,
      },
      {
        path: "/home/transactions",
        element: <History />,
      },
    ],   

  },

]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
