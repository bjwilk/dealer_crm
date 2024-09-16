import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import * as sessionActions from "./store/session";
import Header from "./components/Navigation/Navigation";
import DashBoard from "./components/DashBoard/DashBoard";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import AccountProfile from "./components/AccountProfile/AccountProfile";
import SalesOrderForm from "./components/SalesOrderForm/SalesOrderForm";
import SalesOrder from "./components/SalesOrder/SalesOrder";
import UpdateAccount from "./components/UpdateAccount/UpdateAccount";
import CreateContact from "./components/CreateContact/CreateContact";
import CreateAction from "./components/CreateAction/CreateAction";
import UpdateOrder from "./components/UpdateOrder/UpdateOrder";
import UpdateContact from "./components/UpdateContact/UpdateContact";
import UpdateAction from "./components/UpdateAction/UpdateAction";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore user session on component mount
    dispatch(sessionActions.restoreUser());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    const publicRoutes = ["/login", "/signup"]; // List of routes where users don't need to be logged in
    if (!user && !isLoading && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [user, navigate, location.pathname, isLoading]);

  return (
    <>
      {user ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Outlet /> // Render children (login or signup) if not logged in
      )}
    </>
  );
}

function ProtectedRoute({ element }) {
  const user = useSelector((state) => state.session.user);

  // If the user is logged in, allow them to access the element
  // If not, redirect them to the login page
  return user ? element : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute
            element={<DashBoard />} // Redirects to the dashboard if logged in, otherwise to login
          />
        ),
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<DashBoard />} />,
      },
      {
        path: "/createAccount",
        element: <ProtectedRoute element={<CreateAccount />} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/account/:id",
        element: <ProtectedRoute element={<AccountProfile />} />,
      },
      {
        path: "/account/:id/edit",
        element: <ProtectedRoute element={<UpdateAccount />} />,
      },
      {
        path: "/create-order/:id",
        element: <ProtectedRoute element={<SalesOrderForm />} />,
      },
      {
        path: "/sales-order/:orderId",
        element: <ProtectedRoute element={<SalesOrder />} />,
      },
      {
        path: "/account/:id/contact",
        element: <ProtectedRoute element={<CreateContact />} />,
      },
      {
        path: "/account/:id/action",
        element: <ProtectedRoute element={<CreateAction />} />,
      },
      {
        path: "/account/:id/update-order/:orderId",
        element: <ProtectedRoute element={<UpdateOrder />} />,
      },
      {
        path: "/account/:id/update-contact/:contactId",
        element: <ProtectedRoute element={<UpdateContact />} />,
      },
      {
        path: "/account/:id/update-action/:actionId",
        element: <ProtectedRoute element={<UpdateAction />} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
