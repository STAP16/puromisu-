import { useEffect, useState } from "react";
const MY_API = "http://localhost:8000/protected";

const useProtected = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${MY_API}/content`);
        if (!response.ok) {
          throw new Error(response.status);
        }
        if (response.status === 401) {
          console.error("Not Auth");
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

export default useProtected;
