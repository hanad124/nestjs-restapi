import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../apicalls/users";
import { userStore } from "../store/userStore";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { setData } = userStore();

  const getData = async () => {
    try {
      const response = await getUserInfo();
      if (response?.data.success) {
        setData(response.data.data);
      } else {
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getData();
    }
  }, []);

  if (!localStorage.getItem("token")) {
    return null;
  }
  return <div>{children}</div>;
}

export default ProtectedRoute;
