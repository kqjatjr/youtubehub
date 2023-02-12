import { RecoilRoot } from "recoil";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Result from "./pages/result/Result";
import styled from "styled-components";

function App() {
  return (
    <RecoilRoot>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Layout>
    </RecoilRoot>
  );
}

export default App;

const Layout = styled.div`
  background-color: #f1ece6;
  min-width: 100vw;
  min-height: 100vh;
`;
