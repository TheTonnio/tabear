import React from 'react';
import styled from "styled-components";
import TopBarButton from "./top-bar-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import {LayoutType} from "../../models/layout-type";
import {LAYOUT_TYPES_CODES} from "../../constants";

const TopBar = ({ setLayoutType }: PropTypes) => {
  return (
    <Bar>
      <TopBarButton action={() => setLayoutType(LAYOUT_TYPES_CODES.Grid)} icon={<FontAwesomeIcon icon={faThLarge}/>}/>
      <TopBarButton action={() => setLayoutType(LAYOUT_TYPES_CODES.List)} icon={<FontAwesomeIcon icon={faList}/>}/>
    </Bar>
  );
};

const Bar = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background: #F3F2F8;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface PropTypes {
  setLayoutType: (type: LayoutType) => void
}


export default TopBar;
