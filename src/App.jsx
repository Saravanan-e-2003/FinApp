import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Page from "./Components/Page";
import Auth from "./Components/Auth";
import { isUserAuthenticated } from "./CardinalStorage";
// import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());

  // Handle body overflow based on authentication state
  useEffect(() => {
    if (isAuthenticated) {
      // Reset scroll position to top when authenticated
      window.scrollTo(0, 0);
      // Add overflow-hidden when authenticated (main app)
      document.body.classList.add('overflow-hidden');
    } else {
      // Remove overflow-hidden when not authenticated (auth page)
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function to ensure proper state on unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isAuthenticated]);

  return (
    <Router>
      <div>
        <Routes>
          <Route 
            path="/*" 
            element={
              isAuthenticated ? (
                <div className="h-screen flex flex-col">
                  <Header />
                  <div className="flex-1 overflow-hidden">
                    <Page />
                  </div>
                </div>
              ) : (
                <Auth onAuthSuccess={() => setIsAuthenticated(true)} />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
