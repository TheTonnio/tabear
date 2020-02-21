// @ts-nocheck
import React, { Dispatch, useRef, useContext } from 'react'
import styled from "styled-components";
import { PrimaryCard } from "../../shared/styles/primary-card";
import {DraggableItemTypes} from "../../constants";
import { Bookmark } from "../models/bookmark";
import CardInfo from "./card-info";
import { LayoutTypeContext } from '../../store/layout-type-context'
import DnDDragDropProvider from "../dnd/drag-drop-wrapper";

const Card = ({
  bookmark: {
    url,
    iconUrl,
    name,
    description,
    id
  },
  index,
  isDragging,
  moveCard,
  setDraggableItem,
  collectionId
}: PropTypes) => {

  const dragSource = {
      type: DraggableItemTypes.BOOKMARK,
      id: collectionId,
      index,
      draggableId: id,
    };

  const dropDestination = {
    type: DraggableItemTypes.BOOKMARK,
    id: collectionId,
    index
  };

  const layoutType = useContext(LayoutTypeContext);
  return (
    <DnDDragDropProvider
      dragSource={dragSource}
      dropDestination={dropDestination}
      moveCard={moveCard}
      setDraggableItem={setDraggableItem}
    >
      <CardWrapper
        href={url}

        as="a"
        visible={!isDragging}
      >
        <CardInfo
          layoutType={layoutType}
          name={name}
          description={description}
          url={url}
          iconUrl={iconUrl}
        />
      </CardWrapper>
    </DnDDragDropProvider>
  );
};

export default Card;

type PropTypes = {
  bookmark: Bookmark
  index: number
  collectionId: string
  isDragging: boolean
  setDraggableItem: Dispatch<string | null>
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const CardWrapper = styled(PrimaryCard)`
  overflow: hidden;
  text-decoration: none;
  opacity: ${(props: { visible: boolean }) => props.visible ? 1 : .4};
`;

const ListItemWrapper = styled.div`
  overflow: hidden;
  text-decoration: none;
  opacity: ${(props: { visible: boolean }) => props.visible ? 1 : .4};
  background: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
  cursor: pointer;
`;


const ListItemImage = styled.div`
  width: 30px;
  height: 30px;
  background-image: url("${(props: { iconUrl: string }) => props.iconUrl}");
  background-size: cover;
  background-repeat: no-repeat;
`;

