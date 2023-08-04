import { useGlobalContext } from "../Context";
import { useEffect, useState } from "react";
import Notes from "./Notes";
import "./signup.css";

const SignUp = () => {
  const {
    email,
    password,
    name,
    handleSubmit,
    setEmail,
    setPassword,
    setName,
    submitted,
    people,
    newUser, setNewUser,
    setSubmitted,
    check
  } = useGlobalContext();

  




  return !submitted ? (
    <div className="flex flex-col items-center">
      <form
        class="form flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          class="input"
          type="text"
          placeholder="Name.."
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          class="input"
          type="email"
          placeholder="Email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && check && (<p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{check}</p>)}

        <input
          class="input"
          type="password"
          placeholder="Password..."
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && password.length < 8 && (
    <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
      Password must be at least 8 characters long.
    </p>
  )}

        <button className="button mt-2">
          <span class="button_top"> Submit</span>
        </button>
        <p class="signin">
          Already have an acount ? <span className="text-blue-700 underline cursor-pointer" onClick={()=>setNewUser(false)} onTouchStart={()=>setNewUser(false)} >Sign In</span>
        </p>
      </form>
    </div>
  ) : (
    <Notes />
  );
};

export default SignUp;
