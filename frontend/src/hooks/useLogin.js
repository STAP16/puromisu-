import { useState } from "react";
import { API_URL } from "./api";
const MY_API = `${API_URL}/auth`;

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  async function login(loginData) {
    setLoading(true);
    try {
      const response = await fetch(`${MY_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error("Неверный логин или пароль");
      }
      return await response.json();
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  }
  return { loading, login };
};
