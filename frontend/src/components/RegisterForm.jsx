import React from "react";
import { useState, useRef, useEffect } from "react";

import { StyledWrapper } from "./FormStyle";
import { NavLink, useNavigate } from "react-router-dom";
import checkPasswords from "../utils/checkPasswords";

import { useRegister } from "../hooks/useRegister";
import Loader from "../ArtComponents/Loader";

const VALID_NAME_LENGHT = 3;
const VALID_PASSWORD_LENGHT = 4;

const RegisterForm = () => {
  const { register, loading } = useRegister();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  const userData = {
    username: name,
    hashed_password: password,
  };

  const isValidName = name.length > VALID_NAME_LENGHT;
  const isValidPassword = password.length > VALID_PASSWORD_LENGHT;
  const isValidData = isValidName && isValidPassword;

  const handleSubmit = async () => {
    if (!isValidName) {
      return setError(`Длинна имени должна быть больше > ${VALID_NAME_LENGHT}`);
    }
    if (!isValidPassword) {
      return setError(`Пароль должен быть > ${VALID_PASSWORD_LENGHT}`);
    }
    if (!checkPasswords(password, confirmPassword)) {
      return setError("Пароли не совпадают");
    }

    const data = await register(userData);

    if (data.error) {
      return setError("Пользователь уже существует");
    }

    navigate("/login", { replace: true });
  };

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  if (loading) return <Loader />;
  return (
    <StyledWrapper>
      <div className="form">
        <input
          type="text"
          className="input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameInputRef}
          name="usrname"
        />
        <input
          type="password"
          className="input"
          name="psswr"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="input"
          name="confPsswr"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={() => handleSubmit()}
          className={!isValidData ? "active" : "deactive"}
        >
          Create Account
        </button>
        <div className="infoFormBlock">
          <NavLink to="/login">Have an account?</NavLink>
        </div>
      </div>
      <div className="errorMessage" hidden={false}>
        <span>{error}</span>
      </div>
    </StyledWrapper>
  );
};

export default RegisterForm;
