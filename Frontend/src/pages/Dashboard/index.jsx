import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
const Dashboard = () => {
  const {userInfo,setUserInfo}=useAppStore();
  const navigate=useNavigate();
  useEffect(()=>{
    if(userInfo&&!userInfo.profileSetup){
      toast("please setup profile to continue")
      navigate('/profile');
    }
  },[userInfo,navigate])
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
