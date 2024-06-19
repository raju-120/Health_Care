/* import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Profile from "../Pages/Profile";
import Services from "../Pages/Services";
import Tips from "../Pages/Tips";
import PrivateRoute from "../Components/PrivateRoute";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DashboardHome from "../Pages/DashboardPages/DashboardHome";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/service', element: <Services /> },
      { path: '/tips', element: <Tips /> },
       //Use PrivateRoute properly if needed
      { path: '/profile', element: <PrivateRoute component={Profile} /> },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { path: '/dashboard' , element: <DashboardLayout />}
    ]
  }

]); */