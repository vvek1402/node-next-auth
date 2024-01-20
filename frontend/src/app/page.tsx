"use client";
import React, { useContext } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthContext } from "@/context/AuthContext";

function DashboardPage() {
  const { handleLogout, user } = useContext(AuthContext);

  console.log(user)
  const logout = () => {
    handleLogout();
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
        <a
          href="#"
          className="inline-block mb-6 text-3xl font-bold tracking-wider uppercase text-primary-dark dark:text-light"
        >
          Node Next Auth
        </a>
        <h1>Welcome To the dashboard, <b>{user.username }</b></h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <button onClick={() => logout() } className="flex items-center justify-center px-4 py-2 space-x-2 text-white transition-all duration-200 bg-black rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 dark:focus:ring-offset-darker">
            Log Out
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;
