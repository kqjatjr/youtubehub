import { RecoilRoot } from "recoil";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Result from "./pages/result/Result";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;
