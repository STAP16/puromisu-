import { useParams } from "react-router";
import Button from "../../ArtComponents/Button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { usePromises } from "../../hooks/usePromises";
import Loader from "../../ArtComponents/Loader";

const nullData = `Click "Create Promise" to create promise`;
export default function PromisePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const { getPromises, loading, error } = usePromises();

  useEffect(() => {
    async function getData() {
      const result = await getPromises(id.replace(":", ""));
      setData(result);
    }
    getData();
  }, [id]);

  const handleBack = () => {
    navigate("/main");
  };

  if (error) return <h2>Error {error}</h2>;
  if (!data && !error) return <Loader />;
  if (loading) return <Loader></Loader>;

  return (
    <div className="page">
      <div className="pageContent">
        <h1>{!data[0] ? nullData : null}</h1>
        <div className="centerButton">
          <Button>Create Promise +</Button>
        </div>
      </div>
      <div className="leftButton">
        <Button onClick={handleBack}>{"<"} Back to main</Button>
      </div>
    </div>
  );
}
