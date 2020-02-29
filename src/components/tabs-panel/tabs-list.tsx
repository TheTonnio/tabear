import React from 'react';
import styled from "styled-components";
import DragWrapper from "../dnd/drag-wrapper";
import { DraggableItemTypes } from "../../constants";
import v4 from "uuid/v4";
type Tab = chrome.tabs.Tab;


const TabsList = (props: PropTypes) => {
  const { tabs } = props;

  return (
    <List>
      {
        tabs.map((tabItem: Tab, index) =>
          <DragWrapper key={index} dragSource={{ overload: tabItem, type: DraggableItemTypes.TAB, index: undefined, draggableId: v4(), id: undefined }}>
            <ListItem>{tabItem.title}</ListItem>
          </DragWrapper>)
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
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  cursor: grab;
  transition: border-color .25s;
  
  &:hover {
    border-color: #0F93FE
  }
`;

export default TabsList;
