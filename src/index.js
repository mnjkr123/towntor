import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./pages/auth/auth-signup"; // Import AuthContext


  const root = ReactDOM.createRoot(document.getElementById("root"));
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        fetch("/api/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.user) {
              setUser(data.user);
            } else {
              localStorage.removeItem("token");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },[setUser]);
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  root.render(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

