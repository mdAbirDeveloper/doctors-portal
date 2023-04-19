import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import About from "../../Pages/about/About";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctors from "../../Pages/DashBoard/AddDoctors/AddDoctors";
import AllUsers from "../../Pages/DashBoard/AllUsers/AllUsers";
import Payment from "../../Pages/DashBoard/dashboard/payment/Payment";
import ManageDoctors from "../../Pages/DashBoard/manageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/DashBoard/MyAppointment/MyAppointment";
import Home from "../../Pages/Home/home/Home";
import Login from "../../Pages/logoin/Login";
import SignUp from "../../Pages/logoin/signUp/SignUp";
import DisplayError from "../../Shared/displayError/DisplayError";
import AdminRoute from "../adminRoute/AdminRoute";
import PrivetRoute from "../PrivetRoute/PrivetRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: 'appointment',
                element: <Appointment></Appointment>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/contect',
                element: <About></About>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/AddDoctors',
                element: <AdminRoute><AddDoctors></AddDoctors></AdminRoute>
            },
            {
                path: '/dashboard/manageDoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({params}) => fetch(`https://doctors-portal-server-one-lyart.vercel.app/bookings/${params.id}`)
            },
        ]
    }
])

export default router;
