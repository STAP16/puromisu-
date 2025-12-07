import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US"));

  const date = new Date();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const options = { weekday: "long", month: "long", day: "numeric" };
  const formatted = new Intl.DateTimeFormat("en-US", options).format(date);
  return (
    <StyledWrapper>
      <div className="card">
        <p className="card-title">Piromisu 💫</p>
        <p className="time-text">
          <span>
            <time dateTime="">{time.split(" ")[0]}</time>
          </span>
          <span className="time-sub-text">{time.split(" ")[1]}</span>
        </p>
        <p className="day-text">{formatted}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          strokeWidth={0}
          fill="currentColor"
          stroke="currentColor"
          className="moon"
        >
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 280px;
    height: 150px;
    background: rgb(17, 4, 134);
    border-radius: 15px;
    box-shadow: rgb(0, 0, 0, 0.4) 5px 10px 50px, rgb(0, 0, 0, 0.1) -5px 0px 80px;
    display: flex;
    color: white;
    justify-content: center;
    position: relative;
    flex-direction: column;
    background: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    user-select: none;
  }

  .time-text {
    font-size: 50px;
    margin-top: 0px;
    margin-left: 15px;
    font-weight: 600;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }

  .card-title {
    position: relative;
    font-size: 20px;
    text-align: center;
    top: -10px;
    letter-spacing: 1.5px;
    color: #61eaf6b3;
  }

  .time-sub-text {
    font-size: 15px;
    margin-left: 5px;
  }

  .day-text {
    font-size: 18px;
    margin-top: 0px;
    margin-left: 15px;
    font-weight: 500;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }

  .moon {
    font-size: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
    transition: all 0.3s ease-in-out;
  }
`;

export default Clock;
