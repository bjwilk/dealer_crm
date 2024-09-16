import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation } from "react-router-dom";
import * as sessionActions from "./store/session";
// import { Modal } from "./context/Modal";
import Header from "./components/Navigation/Navigation";
import DashBoard from "./components/DashBoard/DashBoard";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
// import FilterAccounts from "./components/FilterAccounts/FilterAccounts";
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
  const location = useLocation(); // Get current route
  const user = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore user session on component mount
    dispatch(sessionActions.restoreUser());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    // Allow access to login and signup pages even if not logged in
    const publicRoutes = ["/login", "/signup"]; // List of routes where users don't need to be logged in

    // If user is not logged in and trying to access a private page, redirect to login
    if (!user && !isLoading && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [user, navigate, location.pathname, isLoading]);

  // if (isLoading) return <div>Loading...</div>;

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



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/CreateAccount",
        element: <CreateAccount />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/account/:id",
        element: <AccountProfile />,
      },
      {
        path: "/account/:id/edit",
        element: <UpdateAccount />
      },
      {
        path: "/create-order/:id",
        element: <SalesOrderForm />
      },
      {
        path: "/sales-order/:orderId",
        element: <SalesOrder />
      },
      {
        path: "/account/:id/contact",
        element: <CreateContact />
      },
      {
        path: "/account/:id/action",
        element: <CreateAction />
      },
      {
        path: "/account/:id/update-order/:orderId",
        element: <UpdateOrder />
      },
      {
        path: "/account/:id/update-contact/:contactId",
        element: <UpdateContact />
      },
      {
        path: "/account/:id/update-action/:actionId",
        element: <UpdateAction />
      }
    ],
  },
]);

function App() {


  return <RouterProvider router={router} />;
}

export default App;

