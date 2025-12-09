import { useEffect, useState } from "react";
import { API_URL } from "./api";
const MY_API = `${API_URL}/promise/get_all`;

export function usePromises() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getPromises(userId) {
    setLoading(true);
    try {
      const response = await fetch(`${MY_API}/${userId}`);
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, getPromises };
}
