import { useState } from "react";
import useUsers from "./hooks/useUsers";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Main from "./pages/main/Main";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/auth" element={<Auth />} /> */}

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
    </BrowserRouter>
  );
}

export default App;
