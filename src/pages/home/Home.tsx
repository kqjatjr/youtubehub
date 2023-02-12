import { Card, Col, Row, Space } from "antd";
import styled from "styled-components";
import { Title, SubTitle } from "./Home.styled";

const Home = () => {
  return (
    <Row style={{ minWidth: "480px" }}>
      <Col span={24}>
        <Title>
          <span style={{ color: "#FF0000" }}>Youtube</span>
          <span>Hub</span>
        </Title>
        <SubTitle>당신의 유튜브 시청통계를 확인해 보세요</SubTitle>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Home;
