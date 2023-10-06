import "./App.css";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
