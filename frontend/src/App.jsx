import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(storedUser || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.location.reload();
  };

  if (!currentUser) {
    return <Login onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
}
