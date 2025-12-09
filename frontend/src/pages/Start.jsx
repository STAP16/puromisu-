import { replace, useNavigate } from "react-router";
import Button from "../ArtComponents/Button";

export default function Start() {
  const navigate = useNavigate();

  const handleStart = () => {
    return navigate("/register", { replace: true });
  };
  return (
    <div className="page">
      <div className="pageContent">
        <h1 className="title">Welcome to Piromisu!</h1>
        <div className="buttonSection">
          <Button onClick={handleStart}>Start</Button>
        </div>
      </div>
    </div>
  );
}
