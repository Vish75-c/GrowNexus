import React, { useEffect } from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import LandingPage from './pages/LandingPage'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import apiClient from './lib/apiClient'
import { GET_USER_INFO } from './utils/Constant'
import { useAppStore } from './store'

const PrivateRoute=({children})=>{
  const {userInfo,setUserInfo}=useAppStore();
  const isAuthenticated=!!userInfo;
  return isAuthenticated?children:<Navigate to='/auth'/>
}
const AuthRoute=({children})=>{
  const {userInfo,setUserInfo}=useAppStore();
  const isAuthenticated=!!userInfo;
  return isAuthenticated?children:<Navigate to='/dashboard'/>
}
const App = () => {
  const {userInfo,setUserInfo}=useAppStore();
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    const userData=async ()=>{
      try {
        const response=await apiClient.get(GET_USER_INFO,{withCredentials:true});
      if(response.status===200){
        setUserInfo(response.data);
      }else{
        setUserInfo(undefined);
      }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    if(!userInfo){
      userData();
    }else{
      setLoading(false);
    }
  },[userInfo,setUserInfo]);
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<LandingPage/>}/> */}
      <Route path='/auth' element={<AuthRoute><Auth/></AuthRoute>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>

      <Route path='*' element={<Navigate to='/auth'/>}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
