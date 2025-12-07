import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Main from "./pages/main/Main";
import Register from "./pages/auth/Register";
import { UserContext } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [userData, setUserData] = useState(null);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route
            path="/main"
            element={
              <ProtectedRoute setUserData={setUserData}>
                <UserContext.Provider value={userData}>
                  <Main />
                </UserContext.Provider>
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
