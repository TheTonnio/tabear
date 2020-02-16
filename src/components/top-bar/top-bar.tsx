import React from 'react';
import styled from "styled-components";
import TopBarButton from "./top-bar-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {LayoutType} from "../../models/layout-type";
import {LAYOUT_TYPES_CODES} from "../../constants";

const TopBar = ({ onSetLayoutType, onCreateCollectionButtonClick }: PropTypes) => {
  return (
    <Bar>
      <TopBarButton action={() => onCreateCollectionButtonClick()} icon={<FontAwesomeIcon icon={faPlus}/>}/>
      <TopBarButton action={() => onSetLayoutType(LAYOUT_TYPES_CODES.Grid)} icon={<FontAwesomeIcon icon={faThLarge}/>}/>
      <TopBarButton action={() => onSetLayoutType(LAYOUT_TYPES_CODES.List)} icon={<FontAwesomeIcon icon={faList}/>}/>
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
  onSetLayoutType: (type: LayoutType) => void
  onCreateCollectionButtonClick: () => void
}


export default TopBar;
