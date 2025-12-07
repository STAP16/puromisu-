import { useEffect, useState } from "react";
const MY_API = "http://localhost:8000/user/users";

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
