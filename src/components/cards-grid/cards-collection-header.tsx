import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {WRAPPER_MARGIN} from "../../constants";

const CardsCollectionHeader = (props: PropTypes) => {
  const { name, description, isCollectionCollapsed, toggleCollection, disabled } = props;

  return (
    <Header>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <CollapseButton
        onClick={toggleCollection}
        disabled={disabled}
        isCollectionCollapsed={isCollectionCollapsed}
      >
        <FontAwesomeIcon
          icon={faAngleDown}
        />
      </CollapseButton>
    </Header>
  );
};

interface PropTypes {
  name: string
  description: string
  isCollectionCollapsed: boolean
  toggleCollection: () => void
  disabled: boolean
}

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px ${WRAPPER_MARGIN}px 0;
  margin: 0 auto 0;
`;

const Title = styled.span`
  position: relative;
  padding-right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #0075EB;
  
  &::after {
  content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: #0075EB;
    width: 2px;
    border-radius: 2px;
    height: 100%;
  }
`;

const Description = styled.span`
  margin-top: 1px;
  padding-left: 7px;
  color: #1A1C1F;
  font-weight: 500;
`;

const CollapseButton = styled.button`
  margin-left: auto;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: transform .3s, opacity .3s;
  color: #1A1C1F;
  font-size: 25px;
  transform: ${({ isCollectionCollapsed }: { isCollectionCollapsed: boolean }) => `rotate(${isCollectionCollapsed ? 180 : 0}deg)`};
  
  &:hover {
    opacity: .7;
  }
  
  &:disabled {
    cursor: default;
    opacity: .5;
  }
`;

export default CardsCollectionHeader;
