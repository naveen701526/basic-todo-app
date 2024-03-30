import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import './index.css'
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Todos from './components/Todos';
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>
      <Navigation />
      <Home />
    </div>,
  },
  {
    path: '/todos',
    element: <div>
      <Todos />
    </div>,
  },
  {
    path: '/login',
    element: <div>
      <Navigation />
      <Login />
    </div>,
  },
  {
    path: '/register',
    element: <div>
      <Navigation />
      <Register />
    </div>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
