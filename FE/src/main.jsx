import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import Publikasi from './pages/Publikasi.jsx';
import Request from './pages/Request.jsx';
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'publikasi',
    element: <Publikasi />,
  },
  {
    path: 'request',
    element: <Request />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
