import { useState, useEffect, useRef } from "react";
import { StyledWrapper } from "./FormStyle";
import { NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Loader from "../ArtComponents/Loader";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useLogin();

  const usernameInputField = useRef(null);

  const navigate = useNavigate();

  const isFieldsValid = username && password;

  const userLoginData = {
    username,
    password,
  };

  const handleSubmit = async () => {
    if (!isFieldsValid) {
      return setError("Заполните все поля");
    }

    const data = await login(userLoginData);
    if (data.access_token) {
      navigate("/main", { replace: true });
    }
    return setError(data.error?.message);
  };

  useEffect(() => {
    usernameInputField.current.focus();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <StyledWrapper>
      <div className="form">
        <input
          type="text"
          name="username"
          className="input"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={usernameInputField}
        />
        <input
          type="password"
          name="usrpswrd"
          className="input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleSubmit()}>Submit</button>
        <div className="infoFormBlock">
          <NavLink to="/register">Don't have an account?</NavLink>
        </div>
      </div>
      <div className="errorMessage">
        <span>{error}</span>
      </div>
    </StyledWrapper>
  );
};

export default LoginForm;
