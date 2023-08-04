import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import { useGlobalContext } from "./Context";

function App() {

  const {newUser, setNewUser} = useGlobalContext()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!newUser?(<Signup/>):(<Login/>)} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
