import { useState } from "react";
import { API_URL } from "./api";
const MY_API = `${API_URL}/promise`;

export const createPromise = () => {
  const [promiseLoading, setLoading] = useState(false);

  async function promise(promiseData) {
    setLoading(true);
    try {
      const response = await fetch(`${MY_API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(promiseData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Promise error");
      }
      return await response.json();
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  }
  return { promiseLoading, promise };
};
