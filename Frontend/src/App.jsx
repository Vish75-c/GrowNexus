import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import apiClient from "./lib/apiClient";
import { GET_USER_INFO } from "./utils/Constant";
import { useAppStore } from "./store";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  if (!userInfo) return <Navigate to="/auth" />;
  return children;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  return !userInfo ? children : <Navigate to="/dashboard" />;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        console.log(response);
        if (response.status === 201) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        console.error(error);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) fetchUser();
    else setLoading(false);
  }, [setUserInfo, userInfo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
