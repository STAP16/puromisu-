import { useParams } from "react-router";
import Button from "../../ArtComponents/Button";
import { useNavigate } from "react-router";
import { use, useEffect, useState } from "react";

import { usePromises } from "../../hooks/usePromises";

import CosmicModal from "../../components/CreatePromiseModal";
import Loader from "../../ArtComponents/Loader";
import PromiseCard from "../../components/PromiseCard";

import styles from "./PromisePage.module.css";
import { formatToDDMMYYYY } from "../../utils/dateFromat";
import { createPromise } from "../../hooks/createPromise";

const nullData = `Click "Create Promise" to create promise`;
export default function PromisePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const { getPromises, loading, error } = usePromises();
  const { promiseLoading, promise } = createPromise();

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

  const promiseData = {
    user_id: Number(id.replace(":", "")),
    description: modalValue.trim(),
  };

  const handleSave = async () => {
    if (modalValue) {
      const createdPromise = await promise(promiseData);
      if (createdPromise.error) {
        console.error(createdPromise.error);
      }
      setData((prev) => [...prev, createdPromise]);
      setOpen(false);
      setModalValue("");
    }
  };

  if (error) return <h2>Error {error}</h2>;
  if (!data && !error) return <Loader />;
  if (loading) return <Loader></Loader>;

  return (
    <div className="page">
      <div className="pageContent">
        <h1>{!data[0] ? nullData : null}</h1>
        <section className={styles.promiseCardContainer}>
          {data.map((promise) => {
            return (
              <PromiseCard
                key={promise.id}
                id={promise.id}
                title={promise.title}
                description={promise.description}
                date={formatToDDMMYYYY(promise.created_at)}
              />
            );
          })}
        </section>
        <div className="centerButton">
          <Button onClick={() => setOpen(true)}>Create Promise +</Button>
        </div>
      </div>
      <div className="leftButton">
        <Button onClick={handleBack}>{"<"} Back to main</Button>
      </div>
      <CosmicModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        value={modalValue}
        setModalValue={setModalValue}
      />
    </div>
  );
}
