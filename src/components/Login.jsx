import { useGlobalContext } from "../Context";
import { useState, useEffect } from "react";
import Notes from "./Notes";
import "./signup.css";
const Login = () => {
  const {
    email,
    password,
    handleLogin,
    setEmail,
    setPassword,
    submitted,
    error,
    pop,
    newUser, setNewUser
  } = useGlobalContext();


  return (
    <>
      {!submitted ? (
        <div className="flex flex-col items-center bg-lightblue">
          <form
            onSubmit={(e) => {
              handleLogin(e, email, password);
            }}
            className="form flex flex-col items-center gap-4"
          >
            <input
              className="input"
              type="email"
              value={email}
              placeholder="Email.."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              value={password}
              placeholder="Password.."
              onChange={(e) => setPassword(e.target.value)}
            />
            {pop && <div className="font-mono">{pop}</div>}
            <button className="button mt-2 ">
              <span className="button_top">Login</span>
            </button>
            <p class="signin">
              Don't have an acount ? <span className="text-blue-700 underline cursor-pointer" onTouchStart={() => setNewUser(false)} onClick={()=>setNewUser(false)}>Sign Up</span>{" "}
            </p>
          </form>
        </div>
      ) : (
        <Notes />
      )}
    </>
  );
};

export default Login;
