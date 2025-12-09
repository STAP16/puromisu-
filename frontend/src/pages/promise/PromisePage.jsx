import { useParams } from "react-router";
import Button from "../../ArtComponents/Button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { usePromises } from "../../hooks/usePromises";
import Loader from "../../ArtComponents/Loader";
import PromiseCard from "../../components/PromiseCard";

import styles from "./PromisePage.module.css";
import { formatToDDMMYYYY } from "../../utils/dateFromat";

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
        <div className={styles.filterBarContainer}>
          <div className={styles.filterBar}>
            <label class="cosmic-checkbox">
              <h1>Show first</h1>
              <input type="checkbox" />
              <span></span>
            </label>
          </div>
        </div>
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
          <Button>Create Promise +</Button>
        </div>
      </div>
      <div className="leftButton">
        <Button onClick={handleBack}>{"<"} Back to main</Button>
      </div>
    </div>
  );
}
