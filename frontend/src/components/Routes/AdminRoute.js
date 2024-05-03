import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      
      try{
      const res = await axios.get(
      `https://https://ecommerce-compshop-build.vercel.app/api/v1/auth/admin-auth`
    );
    if (res.data.ok) {
      setOk(true);
    } else {
      setOk(false);
    }
      }catch(error){
        console.log(error);
      }
        
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}

export { AdminRoute };
