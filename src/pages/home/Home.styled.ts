import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 70px;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media only screen and (min-width: 1200px) {
    font-size: 150px;
  }
  @media only screen and (min-width: 1100px) {
    font-size: 140px;
  }
  @media only screen and (min-width: 800px) {
    font-size: 120px;
  }
`;

export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media only screen and (min-width: 1200px) {
    font-size: 40px;
  }

  @media only screen and (min-width: 800px) {
    font-size: 30px;
  }
`;
