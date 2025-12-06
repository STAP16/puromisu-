import { useEffect, useState } from "react";
const MY_API = "http://localhost:8000/user";

const useUsers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${MY_API}/users`);
        if (!response.ok) {
          throw new Error("Ошибка получения данных");
        }
        setData(await response.json());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useUsers;
