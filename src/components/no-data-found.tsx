import React from 'react';
import styled from "styled-components";
import {defaultAccent} from "../constants";

export const NoDataFound = () => (
  <Wrapper>
    <h1>No Bookmarks Found ;-(</h1>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
  width: 100%;
  color: ${defaultAccent};
`;
