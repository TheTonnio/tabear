// @ts-nocheck
import React, { Dispatch, useContext } from 'react'
import styled from "styled-components";
import { PrimaryCard } from "../../shared/styles/primary-card";
import { DraggableItemTypes } from "../../constants";
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
  draggableItemId,
  moveCard,
  setDraggingItemId,
  collectionId
}: PropTypes) => {

  const isDragging = draggableItemId === id;
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
      setDraggingItemId={setDraggingItemId}
    >
      <CardWrapper
        href={url}
        as="a"
      >
        <CardInfo
          layoutType={layoutType}
          name={name}
          description={description}
          url={url}
          iconUrl={iconUrl}
          draggableItemId={draggableItemId}
          isDragging={isDragging}
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
  draggableItemId?: string | null
  setDraggingItemId: Dispatch<string | null>
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const CardWrapper = styled(PrimaryCard)`
  overflow: hidden;
  text-decoration: none;
`;
