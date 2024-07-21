import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hum from './Hum';
import Temp from './Temp';
import Battery from './Battery';
const router = createBrowserRouter([
  {
    path: "/Hum",
    element: <Hum/>,
  },
  {    path:"/Temp",
    element: <Temp/>  
  },
  {
    path:'/Battery',
    element:<Battery/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
