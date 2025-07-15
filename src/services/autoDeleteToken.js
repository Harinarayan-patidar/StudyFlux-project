import { useEffect, useState } from 'react';
import { logout } from './operations/authAPI';

// This function checks if the token is expired and removes it from localStorage if it is.
export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return now >= expiry;
  } catch (e) {
    console.error("Invalid token:", e);
    return true; // if decoding fails, assume token is invalid
  }
}

export function useAuthCheck() {
  const [authValid, setAuthValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      setAuthValid(false); // trigger re-render if token is expired
    }

    // Optional: check periodically (every 5 seconds)
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken && isTokenExpired(currentToken)) {
        localStorage.removeItem('token');
        logout()
        setAuthValid(false); // Set authValid to false if token expires
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return authValid;
}
