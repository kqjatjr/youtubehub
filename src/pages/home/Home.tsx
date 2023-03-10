import { Button, Card, Col, Row, Space } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Title, SubTitle, MainContainer } from "./Home.styled";
import { AiFillGithub } from "react-icons/ai";
import styled from "styled-components";

const Home = () => {
  return (
    <MainContainer
      style={{ minWidth: "480px", padding: "0 20px" }}
      gutter={[0, 30]}
    >
      <Col span={24}>
        <Title>
          <span style={{ color: "#FF0000" }}>Youtube</span>
          <span>Hub</span>
        </Title>
        <SubTitle>당신의 유튜브 시청통계를 확인해 보세요</SubTitle>
      </Col>
      <Col span={24}>
        <ButtonContainer gutter={[20, 0]}>
          <Col>
            <Button size="large">데이터는 어디서 구하나요?</Button>
          </Col>
          <Col>
            <Button size="large">데이터가 이미 있습니다.</Button>
          </Col>
        </ButtonContainer>
      </Col>
      <Footer style={{ marginTop: "auto", marginBottom: "5px" }}>
        <Button size="large">
          <a
            href="https://github.com/kqjatjr"
            target={"_blank"}
            rel="noreferrer"
          >
            <AiFillGithub />
          </a>
        </Button>
      </Footer>
    </MainContainer>
  );
};

export default Home;

const ButtonContainer = styled(Row)`
  display: flex;
  justify-content: center;
`;
