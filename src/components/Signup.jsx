import { useGlobalContext } from "../Context";
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
    newUser, setNewUser
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          class="input"
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          class="input"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button mt-2">
          <span class="button_top"> Submit</span>
        </button>
        <p class="signin">
          Already have an acount ? <span className="text-blue-700 underline cursor-pointer" onClick={()=>setNewUser(false)}>Sign In</span>
        </p>
      </form>
    </div>
  ) : (
    <Notes />
  );
};

export default SignUp;
