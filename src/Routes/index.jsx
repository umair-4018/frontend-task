import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Page404 from "../404";
import LoginPage from "../components/auth/login";
import SignupPage from "../components/auth/signup";
import  Dashboard  from "../components/dashboard/index";
import BookShelf from "../components/bookShelf/index";

const ComponentRoute = () => {
    const token = useSelector((state) => state.login.user?.token);
    const autoCloseDuration = process.env.REACT_APP_TOAST_AUTO_CLOSE_DURATION || 1500;
    const authRoutes = [
        { path: "/login", component: LoginPage },
        { path: "/signup", component: SignupPage },

    ];
    const chatRoutes = [

        { path: "/", component: Dashboard },
        { path: "/bookshelf", component: BookShelf }
    ];
    return (
        <>
            <ToastContainer
                autoClose={Number(autoCloseDuration)}
                position="bottom-right"
                style={{ color: "red" }} // Change "red" to the desired text color
            />
            <Routes>
                {token
                    ? chatRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))
                    : authRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
};
export default ComponentRoute;
