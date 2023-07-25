import { Spin } from "antd";
import React from "react";
import { styled } from "styled-components";

const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageLoading = () => {
  return (
    <Loading>
      <Spin />
    </Loading>
  );
};

export default PageLoading;
