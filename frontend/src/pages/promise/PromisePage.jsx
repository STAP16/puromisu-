import { useParams } from "react-router";
import Button from "../../ArtComponents/Button";
import { useNavigate } from "react-router";

import { useState } from "react";

export default function PromisePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/main");
  };
  const { id } = useParams();
  return (
    <div className="page">
      <div className="pageContent">
        <h1>Promises</h1>
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
