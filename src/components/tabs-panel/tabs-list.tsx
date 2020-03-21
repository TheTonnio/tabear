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
      <ListHeader>Opened Tabs</ListHeader>
      {
        tabs.map((tabItem: Tab, index) =>
          <DragWrapper key={index} dragSource={{ overload: tabItem, type: DraggableItemTypes.TAB, index: undefined, draggableId: v4(), id: undefined }}>
            <ListItem>
              <Thumb url={tabItem.favIconUrl}/>
              <Title>{tabItem.title}</Title>
            </ListItem>
          </DragWrapper>)
      }
    </List>
  );
};

interface PropTypes {
  tabs: Tab[]
}

const ListHeader = styled.div`
  width: 100%;
  padding: 14px 0;
  text-align: center;
  font-weight: 700;
  color: #0075EB;
`;

const Thumb = styled.div`
  display: inline-block;
  min-width: 20px;
  height: 20px;
  background-image: url(${((props: { url?: string }) => props.url)});
  background-size: 18px 18px;
  background-position: center;
`;

const List = styled.div`
  width: 300px;
  margin: 0;
  padding: 0 20px 25px;
  list-style: none;
`;

const Title = styled.span`
  padding-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  cursor: grab;
  transition: border-color .25s;
  font-size: 16px;
  
  &:hover {
    border-color: #0F93FE
  }
`;

export default TabsList;
