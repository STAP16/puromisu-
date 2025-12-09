import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useRefresh from "../hooks/useRefresh";

export const AuthContext = createContext(null);

import { API_URL } from "../hooks/api";
const MY_API = `${API_URL}/protected`;

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        let res = await fetch(`${MY_API}/content`, { credentials: "include" });

        // Если access токен слетел

        if (res.status === 403) {
          const refresh = await useRefresh();
          if (refresh.error) {
            throw new Error("Refresh tkn exp");
          }
          // повторяем fetch после успешного refresh
          res = await fetch(`${MY_API}/content`, { credentials: "include" });
        }

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
