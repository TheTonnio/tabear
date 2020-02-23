import React, { Dispatch } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CardsCollectionHeader = ({
  name,
  description,
  isCollapsed,
  toggleCollection,
  disabled,
}: PropTypes) => {
  return (
    <Header>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <CollapseButton
        onClick={toggleCollection}
        disabled={disabled}
      >
        <Icon
          icon={faAngleDown}
          isCollapsed={isCollapsed}
        />
      </CollapseButton>
    </Header>
  );
};

interface PropTypes {
  name: string
  description: string
  isCollapsed: boolean
  toggleCollection: () => void
  disabled: boolean
}

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0 auto 0;
`;

const Title = styled.span`
  position: relative;
  padding-right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #0F93FE;
  
  &::after {
  content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: #0F93FE;
    width: 2px;
    border-radius: 2px;
    height: 100%;
  }
`;

const Description = styled.span`
  margin-top: 2px;
  padding-left: 7px;
  color: #6784A3;
  font-weight: 500;
`;

const CollapseButton = styled.button`
  width: 25px;
  height: 25px;
  margin-top: -6px;
  margin-left: auto;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: transform .3s, opacity .3s;
  color: #6784A3;
  font-size: 25px;

  &:hover {
    opacity: .7;
  }
  
  &:disabled {
    cursor: default;
    opacity: .5;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  transform: ${({ isCollapsed }: { isCollapsed: boolean }) => `rotate(${isCollapsed ? 180 : 0}deg)`};
  transition: transform .3s;
`;

export default CardsCollectionHeader;
