// Creates a global auth state for your app.

// Tracks whether an instructor is logged in or not.

// Exposes login and logout functions to update this state.

// Saves user info in localStorage to keep login after page refresh.

// Makes it easy to access auth info with useAuth() hook.



import React, { createContext, useContext, useState, useEffect } from "react";

// Create context object to share authentication state across components
const AuthContext = createContext();

// Provider component to wrap your app and provide auth state
export const AuthProvider = ({ children }) => {
  // State to hold the current logged-in user info (null if not logged in)
  const [user, setUser] = useState(null);

  // When app loads, check if user info is saved in localStorage (simulate login persistence)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);  // restore user if found
  }, []);

  // Function to save user info on login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));  // persist login
  };

  // Function to logout user and clear stored info
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Provide the user state and login/logout functions to child components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume auth context in any component
export const useAuth = () => useContext(AuthContext);
