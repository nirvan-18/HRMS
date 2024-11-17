import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import { AuthProvider } from "./context/AuthContext";
// import Header1 from './components/Header1';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <Routes>
          {/* Define your routes here */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<MainPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
