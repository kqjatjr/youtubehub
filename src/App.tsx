import { RecoilRoot } from "recoil";
import Result from "./pages/result/result";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Result />
      </div>
    </RecoilRoot>
  );
}

export default App;
