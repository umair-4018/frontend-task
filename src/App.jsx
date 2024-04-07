import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import ComponentRoute from "./Routes";
import Api from "./services/api";
import Loader from "./common/loader";
import { useNavigate } from "react-router-dom"; 
const App = () => {
    const token = useSelector((state) => state.login.user?.token);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      if (token) {
        Api.setClientToken(token);
        navigate("/dashboard"); // Navigate to "/" if the token exists
      } else {
        navigate("/login"); // Navigate to "/main" if the token doesn't exist
      }
      setLoading(false);
    };
    fetchToken();
  }, [token, history]);
    if (loading) {
        return <Loader />;
    }
    return (
        <>
        <ComponentRoute/>
        </>
    );
};
export default App;

