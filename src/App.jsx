import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Api from "./services/api";
import Loader from "./common/loader";
import ComponentRoute from "./Routes";
const App = () => {
    const token = useSelector((state) => state.login.user?.token);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
    useEffect(() => {
      const fetchToken = async () => {
        if (token) {
          Api.setClientToken(token);
          navigate("/")

          setLoading(false);
        }
        else{
          navigate("/login")
        }
      };
      fetchToken();
    }, [token]);
    
  
    return (
        <>
        <ComponentRoute/>
        </>
    );
};
export default App;

