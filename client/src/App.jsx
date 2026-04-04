import { RequireAuth, Layout } from "./routes/layout/layout";
import HomePage from "./routes/homePage/homePage";
import TrackInfo from "./routes/trackInfo/trackInfo";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ContactUs from "./routes/contactus/ContactUs";
import AboutUs from "./routes/aboutus/AboutUs";
import Services from "./routes/services/Services";
import AdminHome from "./routes/adminhome/AdminHome";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/track/data",
          element: <TrackInfo />,
        },

        {
          path: "/contactus",
          element: <ContactUs />,
        },
        {
          path: "/aboutus",
          element: <AboutUs />,
        },
        {
          path: "/ourservices",
          element: <Services />,
        },
        {
          path: "/Admin/login",
          element: <Login />,
        },
        {
          path: "Admin/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/admin/home",
          element: <AdminHome />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
