import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx"
import ErrorPage from './pages/ErrorPage.jsx';
import { Provider } from 'react-redux';
import Store from './store.js';
import AccountTable from "./pages/AccountPage.jsx";
import ContactPage from './pages/ContactPage.jsx';
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import AccountById from './pages/AccountById.jsx';
import ContactById from './features/Contact/component/ContactById.jsx';
import FormValidation from "./ContextApi/FormValidation.jsx"
import MiddlePage from "./pages/MiddlePage.jsx"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (<App />),
      errorElement: (<ErrorPage />),
      children: [
        {
          path: "",
          element: (<Home />)
        },
       
        {
          path: "/AccountPage",
          element: (
              <AccountTable />
          )
        },
        {
          path:"/MiddlePage",
          element:(
            <MiddlePage/>
          )
        },
        {
          path: "/contactPage",
          element: (
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          )
        },
        {
          path:"/account/record/:id",
          element:(
            <ProtectedRoute>
              <AccountById/>

            </ProtectedRoute>
          )
        },
        {
          path:"/contact/getAllContactBy/:id",
          element:<ProtectedRoute>
            <ContactById/>
          </ProtectedRoute>
        }
      ]
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <FormValidation>
    <RouterProvider router={router} />
    </FormValidation>
  </Provider>

)
