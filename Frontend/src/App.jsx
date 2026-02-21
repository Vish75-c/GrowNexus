import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import apiClient from "./lib/apiClient";
import Layout from "./Layout";
import { GET_USER_INFO } from "./utils/Constant";
import { useAppStore } from "./store";
import Chat from "./pages/Chat";
import Find from "./pages/Find";
import LandingPage from "./pages/LandingPage";
import Documentation from "./pages/Documentation";
import Noticeboard from "./pages/Noticeboard";
import EmptyContainer from "./pages/EmptyContainer";
import Contact from "./pages/Contact";
import PostOpportunity from "./pages/Hiring/PostOpportunity";
import HiringPost from "./pages/Hiring/HiringPost";
import ShareExperience from "./pages/Blog/ShareExperience";
import Feed from "./pages/Blog/Feed";
import MyPost from "./pages/Blog/My-Post";
import FeedCard from "./pages/Blog/FeedCard";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  if (!userInfo) return <Navigate to="/auth" />;
  return children;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  return !userInfo ? children : <Navigate to="/main" />;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        // console.log(response);
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
        <Route path="/" element={<LandingPage/>}/>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          
          <Route index element={<Navigate to="empty-screen" />} />
          <Route path="empty-screen" element={<EmptyContainer/>}/>
          <Route path="profile" element={<MyProfile userInfo={userInfo}/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="message" element={<Chat />} />
          <Route path="find" element={<Find />} />

          <Route path="share-experience" element={<ShareExperience />} />
          <Route path="feed" element={<Feed/>}/>
          <Route path="my-post" element={<MyPost/>}/>
          <Route path="feed/:id" element={<FeedCard/>}/>
          
          <Route path="post-opportunity" element={<PostOpportunity/>}/>
          <Route path="hiring-post" element={<HiringPost/>}/>
          <Route path="docs" element={<Documentation/>}/>
          <Route path="notices" element={<Noticeboard/>}/>
          {/* initially not making contact page */}
          <Route path="contact" element={<Contact/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
