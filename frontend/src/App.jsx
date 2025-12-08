import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Main from "./pages/main/Main";
import Register from "./pages/auth/Register";
import { AuthProvider } from "./context/AuthContext";
import PromisePage from "./pages/promise/PromisePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route
            path="/promises/:id"
            element={
              <ProtectedRoute>
                <PromisePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/service" element={<Services />} />
        <Route path="profile" element={<Profile />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
