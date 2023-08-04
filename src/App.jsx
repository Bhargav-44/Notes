import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import { useGlobalContext } from "./Context";

function App() {
  const { curUser, error, submitted } = useGlobalContext();
  console.log(submitted)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login/>}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/notes"
            element={<Notes/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
