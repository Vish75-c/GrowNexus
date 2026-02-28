import React, { useState } from "react";
import AuthImg from "../../assets/auth.jpg";
import Logo from "@/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import apiClient from "@/lib/apiClient";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/Constant";
import { useAppStore } from "@/store";
import Footer from "@/Footer";
import Navbar from "@/Navbar";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!validateLogin()) return;
    
    setLoading(true);
    try {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      // Note: Login usually returns 200 OK. If your backend returns 201, keep it as 201.
      if (response.status === 200 || response.status === 201) {
        setUserInfo(response.data);
        toast.success("Login Successful!");
        navigate("/main");
      }
    } catch (error) {
      // Handles 401, 404, 500 etc.
      const errorMessage = error.response?.data || "Wrong email or Password";
      toast.error(typeof errorMessage === 'string' ? errorMessage : "Login Failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;

    setLoading(true);
    try {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUserInfo(response.data);
        toast.success("Account Created Successfully!");
        navigate("/main");
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Signup failed. Please try again.";
      toast.error(typeof errorMessage === 'string' ? errorMessage : "Signup Failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validateLogin = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address with @");
      return false;
    }
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address with @");
      return false;
    }
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (!confirmPassword || confirmPassword !== password) {
      toast.error("Password and Confirm Password do not match");
      return false;
    }
    return true;
  };

  return (
    <>
      <Navbar />
      <div className="poppins-medium mt-20 h-full w-full flex grid-cols-1 md:grid md:grid-cols-2 bg-slate-50 overflow-y-auto">
        <div className="flex flex-col justify-center items-center p-6 md:p-12 w-full">
          <div className="w-full max-w-120 min-h-155 flex flex-col bg-white p-8 md:p-12 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
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
              <TabsList className="grid w-full grid-cols-2 bg-slate-100 rounded-2xl h-14 mb-8">
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
                        <div className="relative">
                          <Input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all px-6 pr-12"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div 
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 mt-4 transition-all active:scale-95"
                        onClick={handleLogin}
                        disabled={loading}
                      >
                        {loading ? "Signing In..." : "Sign In"}
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
                      <div className="relative">
                        <Input
                          placeholder="Create Password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-14 rounded-2xl bg-slate-50 border-none px-6 pr-12"
                        />
                        <div 
                          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
                      </div>
                      <Input
                        placeholder="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-14 rounded-2xl bg-slate-50 border-none px-6"
                      />
                      <Button
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 mt-2 transition-all active:scale-95"
                        onClick={handleSignup}
                        disabled={loading}
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Tabs>

            <div className="mt-8 pt-6 border-t border-slate-50">
              <p className="text-center text-[13px] text-slate-400 font-medium">
                Join <span className="text-slate-600">500+ students</span> already
                connecting.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block h-full w-full">
          <img src={AuthImg} alt="Branding" className="object-cover h-full w-full" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;