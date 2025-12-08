import { useState } from "react";
const MY_API = "http://localhost:8000/auth";

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
