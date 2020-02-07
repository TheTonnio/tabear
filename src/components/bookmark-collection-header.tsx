import React, { Dispatch } from 'react';
import styled from "styled-components";
import { PrimaryCard } from "../shared/styles/primary-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const BookmarkCollectionHeader = ({ name, description, isCollapsed, toggleCollection }: PropTypes) => {
  return (
    <Header>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <CollapseButton onClick={toggleCollection}>
        <Icon icon={faAngleDown}/>
      </CollapseButton>
    </Header>
  );
};

interface PropTypes {
  name: string
  description: string
  isCollapsed: boolean
  toggleCollection: () => void
}

const Header = styled(PrimaryCard)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px 12px;
  margin: 0 auto 20px;
`;

const Title = styled.span`
  position: relative;
  padding-right: 10px;
  font-size: 18px;
  font-weight: bold;
  
  &::after {
  content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: #3c78bf;
    width: 1px;
    height: 100%;
  }
`;

const Description = styled.span`
  margin-top: -1px;
  padding-left: 10px;
  color: #3c78bf;
`;

const CollapseButton = styled.button`
  width: 25px;
  height: 25px;
  margin-left: auto;
  background: #f5f4f9;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0 3px rgba(0, 0, 0, .2);
  transition: transform .3s, opacity .3s;
  color: #3c78bf;

  &:hover {
  opacity: .7;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  transition: transform .3s;
`;

export default BookmarkCollectionHeader;
