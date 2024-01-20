"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: any;
  handleSignIn: (data: { email: string; password: string }) => void;
  handleLogout: () => void;
  handleSignUp: (data: { email: string; password: string; username: string}) => void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post<{ token: string; user: any }>(
        apiUrl + "auth/signin",
        data
      );
      toast.success("Signin Successfull");
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      setIsAuthenticated(true);
      router.push("/");
    } catch (error : any) {
      toast.error(error.response?.data?.error || "Signin failed");
    }
  };

  const handleSignUp = async (data: { email: string; password: string; username: string }) => {
    try {
      await axios.post<{ token: string; user: any }>(
        apiUrl + "auth/signup",
        data
      );
      toast.success("User Created Successfully, you can signin now");
      router.push("/signin");
    } catch (error : any) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    router.push("/Signin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, handleSignIn, handleLogout, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};
