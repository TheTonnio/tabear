import React from 'react';
import styled from "styled-components";
import {defaultAccent} from "../../constants";

const TopBarButton = ({ icon, action, isGrouped, isActive }: PropTypes) => {
  return (
    isGrouped ? (
      <GroupedButton
        onClick={action}
        // @ts-ignore
        className={isActive && "active"}
      >
        { icon }
      </GroupedButton>
    ) : (
      <Button
        onClick={action}
      >
        { icon }
      </Button>
    )
  );
};

interface PropTypes {
  action: () => any
  icon: any
  isActive?: boolean
  isGrouped?: boolean
}

const Button = styled.button`
  width: 35px;
  height: 35px;
  font-size: 16px;
  margin-left: 2px;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: opacity .3s;
  color: ${defaultAccent};
  
  &:hover {
    opacity: .7;
  }
  
  &.active {
    color: ${defaultAccent};
  }
`;

const GroupedButton = styled(Button)`
  opacity: .3;
  margin-left: 2px;

  &:not(:last-child) {
    margin-left: 3px;
  }  
  
  &:not(:first-child) {
    margin-right: 3px;
  }
  
  &.active {
    opacity: 1;
  }
`;


export default TopBarButton;
