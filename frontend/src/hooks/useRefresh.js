const MY_API = "http://localhost:8000/protected";

async function useRefresh() {
  try {
    const response = await fetch(`${MY_API}/refresh`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    if (response.status === "401") {
      console.error("Not Auth");
    }
    return await response.json();
  } catch (error) {
    return { error };
  }
}

export default useRefresh;
