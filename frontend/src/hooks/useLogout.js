import { useState } from "react";
import { API_URL } from "./api";
const MY_API = `${API_URL}/auth`;

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      const response = await fetch(`${MY_API}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Ошибка выхода из аккаунта");
      }
      return await response.json();
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  }
  return { loading, logout };
};
