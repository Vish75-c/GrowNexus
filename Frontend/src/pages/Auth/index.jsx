import React, { useState } from "react";
import AuthImg from "../../assets/auth.jpg";
import Logo from "@/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = async () => {
    if(validateLogin(email,password)){

    }
  };
  const handleSignup = async () => {};
  const validateLogin=(email,password)=>{
    if(!email){
      toast.error("College email is Required")
      return false;
    }
    if(!password){
      toast.error("Password is Required")
      return false;
    }
    return true;
  }
  const validateSignup=(email,password,confirmPassword)=>{
     if(!email){
      toast.error("College email is Required")
      return false;
    }
    if(!password){
      toast.error("Password is Required")
      return false;
    }
     if(!confirmPassword||confirmPassword!=password){
      toast.error("Password and Confirm Passwrd is not same")
      return false;
    }
    return true;
  }
  return (
    <div className="poppins-medium screen w-full flex grid-cols-1 md:grid md:grid-cols-2 bg-slate-50 overflow-hidden">
      <div className="flex flex-col justify-center items-center p-6 md:p-12 w-full">
        {/* Fixed height container to prevent jumping */}
        <div className="w-full max-w-[480px] min-h-[620px] flex flex-col bg-white p-8 md:p-12 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
          
          <div className="flex flex-col items-center gap-3 mb-10">
            <Logo className="w-12 h-12" />
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Growth<span className="text-blue-600">Nexus</span>
              </h1>
              <p className="text-slate-400 text-sm font-medium mt-1">
                Empowering your college journey.
              </p>
            </div>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full flex-1 flex flex-col"
          >
            {/* Full-width transition bar */}
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-2xl h-14 mb-8">
              <TabsTrigger
                value="login"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-300 font-semibold"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-300 font-semibold"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="space-y-4">
                      <Input
                        placeholder="College Email"
                        type="email"
                        className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all px-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        placeholder="Password"
                        type="password"
                        className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all px-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 mt-4 transition-all active:scale-95" 
                      onClick={handleLogin}
                    >
                      Sign In
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <Input
                      placeholder="College Email"
                      type="email"
                      className="h-14 rounded-2xl bg-slate-50 border-none px-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      placeholder="Create Password"
                      type="password"
                      className="h-14 rounded-2xl bg-slate-50 border-none px-6"
                    />
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      className="h-14 rounded-2xl bg-slate-50 border-none px-6"
                    />
                    <Button 
                      className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 mt-2 transition-all active:scale-95" 
                      onClick={handleSignup}
                    >
                      Create Account
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          <div className="mt-8 pt-6 border-t border-slate-50">
            <p className="text-center text-[13px] text-slate-400 font-medium">
              Join <span className="text-slate-600">500+ students</span> already connecting.
            </p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:block h-full w-full">
        <img src={AuthImg} alt="Branding" className="object-cover h-full w-full" />
      </div>
    </div>
  );
};

export default Auth;