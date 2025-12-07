import React from "react";
import { StyledWrapper } from "./FormStyle";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  return (
    <StyledWrapper>
      <div className="form">
        <input type="text" className="input" placeholder="Enter your name" />
        <input type="password" className="input" placeholder="*********" />
        <button>Submit</button>
        <NavLink to="/register">Don't have an account?</NavLink>
      </div>
    </StyledWrapper>
  );
};

export default LoginForm;
