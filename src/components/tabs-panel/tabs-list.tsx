import React from 'react';
import styled from "styled-components";
import DragWrapper from "../dnd/drag-wrapper";
import {defaultAccent, DraggableItemTypes} from "../../constants";
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
  color: ${defaultAccent};
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
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 17px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  cursor: grab;
  transition: opacity .3s, transform .3s;
  font-size: 16px;
  overflow: hidden;
  transform: scale(1);
  
  &::after {
    position: absolute;
    top: 0;
    left: 0;  
    height: 100%;
    width: 100%;
    content: "";
    background: linear-gradient(90deg, rgba(255,255,255,0) 70%, rgba(255,255,255,1) 100%);
    pointer-events: none;
  }
  
  &:hover {
    opacity: .7;
    transform: scale(1.025);
  }
`;

export default TabsList;
