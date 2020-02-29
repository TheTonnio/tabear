import React from 'react';
import styled from "styled-components";
type Tab = chrome.tabs.Tab;

const TabsList = (props: PropTypes) => {
  const { tabs } = props;

  return (
    <List>
      {
        tabs.map((tabItem: Tab, index) =>
          <ListItem key={index}>{tabItem.title}</ListItem>)
      }
    </List>
  );
};

interface PropTypes {
  tabs: Tab[]
}

const List = styled.div`
  list-style: none;
  padding: 40px 20px 25px;
  margin: 0;
`;

const ListItem = styled.div`
  margin-top: 10px;
  padding: 10px;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  border: 3px solid #e8f2fc;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color .25s;
  
  &:hover {
    border-color: #0F93FE
  }
`;

export default TabsList;
