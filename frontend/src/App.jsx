import { useState } from "react";
import { BottomLoader } from "./ArtComponents/Cirlce";
import Loader from "./ArtComponents/Loader";
import useUsers from "./hooks/useUsers";

function App() {
  const { data, loading, error } = useUsers();

  if (loading) return <Loader />;
  if (error) return console.error(error);

  return <h1>Запрос успешен!</h1>;
}

export default App;
