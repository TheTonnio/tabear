import React from 'react';
import { ActionMenuConfig } from "../../models/action-menu-config";
import styled from "styled-components";
import {defaultAccent} from "../../constants";

const ActionMenu = (props: PropTypes) => {
  const { config, isActionMenuShown } = props;

  return (
    <List hidden={!isActionMenuShown}>
      {config.map(({ action, icon, text, iconColor }, index) => (
        <ListItem onClick={action} key={index}>
          <IconWrapper
            color={iconColor || defaultAccent}
          >
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

export default ActionMenu;

const List = styled.ul`
  position: absolute;
  padding: 0;
  right: 22px;
  top: 45px;
  margin: 0;
  opacity: ${({ hidden }: { hidden: boolean}) => hidden ? 0 : 1};
  visibility: ${({ hidden }: { hidden: boolean}) => hidden ? "hidden" : "visible"};
  transition: opacity .3s;
  list-style: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  user-select: none;
  overflow: hidden;
  background: #fff;
  z-index: 100;
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
