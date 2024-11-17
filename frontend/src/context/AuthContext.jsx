import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api from '../utils/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/profile");
        setUser(response.data);
        console.log('response',response)
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUser();
  }, []);

  const login = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const logout = async () => {
    await axios.get("http://localhost:3000/api/logout", {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
