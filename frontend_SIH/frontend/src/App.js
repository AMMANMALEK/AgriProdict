import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { languages, translations } from "./mockData";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import CropSelection from "./components/CropSelection";
import Reports from "./components/Reports";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import "./App.css";

// Language Context
const LanguageContext = React.createContext();

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// User Context
const UserContext = React.createContext();

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
  };

  const handleLogin = (user = null) => {
    setIsLoggedIn(true);
    if (user) {
      setUserData(user);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      t, 
      languages,
      isLoggedIn,
      handleLogin,
      handleLogout 
    }}>
      <UserContext.Provider value={{
        userData,
        updateUserData
      }}>
        <div className="App min-h-screen bg-gray-50">
          <BrowserRouter>
            {isLoggedIn ? (
              <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-64">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/crop-selection" element={<CropSelection />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;