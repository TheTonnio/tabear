import React, {useEffect} from 'react';
import { ActionMenuConfig } from "../../models/action-menu-config";
import styled from "styled-components";
import {defaultAccent} from "../../constants";

const ActionMenu = (props: PropTypes) => {
  const { config, isActionMenuShown } = props;

  return (
    <List className={!isActionMenuShown ? "hidden" : ""}>
      {config.map(({ action, icon, text, iconColor }, index) => (
        <ListItem onClick={action} key={index}>
          <IconWrapper color={iconColor || defaultAccent}>
            {icon}
          </IconWrapper>
          {text}
        </ListItem>
      ))}
    </List>
  );
};

interface PropTypes {
  config: ActionMenuConfig
  isActionMenuShown: boolean
}

const List = styled.ul`
  position: absolute;
  padding: 0;
  right: 22px;
  top: 45px;
  margin: 0;
  transition: opacity .3s;
  opacity: 1;
  list-style: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  user-select: none;
  overflow: hidden;
  background: #fff;
  z-index: 100;
  
  &.hidden {
    opacity: 0;
  }
`;

const ListItem = styled.li`
  position: relative;
  padding: 7px 7px;
  color: #8B959E;
  font-size: 15px;
  cursor: pointer;
  background: #ffffff;

  &:hover {
    background: #F4F7FB;
  }
  
  &:not(:first-child) {
    &:after {
      content: '';
      top: 0;
      left: 0;
      position: absolute;
      background: #dedede;
      height: 1px;
      width: 100%;
    }
  }
`;

const IconWrapper = styled.div`
  display: inline-block;
  width: 25px;
  padding-right: 5px;
  color: ${({ color }: { color: string }) => color};
  opacity: .85;
`;

export default ActionMenu;
