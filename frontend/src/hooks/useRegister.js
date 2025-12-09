import { useEffect, useState } from "react";
import { API_URL } from "./api";
const MY_API = `${API_URL}/user/users`;

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  async function register(userData) {
    setLoading(true);
    try {
      const response = await fetch(`${MY_API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Пользователь уже существует");
      }
      return await response.json();
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  }

  return { register, loading };
};
