import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import ComponentRoute from "./Routes";
import Api from "./services/api";
import Loader from "./common/loader";
const App = () => {
    const token = useSelector((state) => state.login.user?.token);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchToken = async () => {
        if (token) {
          Api.setClientToken(token);
          setLoading(false);
        }
      };
      fetchToken();
    }, [token]);
    
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

