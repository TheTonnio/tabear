// @ts-nocheck
import React, { Dispatch, useContext } from 'react'
import styled from "styled-components";
import { PrimaryCard } from "../../shared/styles/primary-card";
import { DraggableItemTypes } from "../../constants";
import { Bookmark } from "../models/bookmark";
import CardInfo from "./card-info";
import { LayoutTypeContext } from '../../store/layout-type-context'
import DragDropWrapper from "../dnd/drag-drop-wrapper";
import { DnDSource } from "../../models/dnd-source";

const Card = (props : PropTypes) => {
  const { bookmark, index, draggingItemId, moveCard, setDraggingItemId, collectionId } = props;
  const { url, iconUrl, name, description, id } = bookmark;

  const layoutType = useContext(LayoutTypeContext);

  const isDragging = draggingItemId === id;
  const dragSource: DnDSource = {
    type: DraggableItemTypes.BOOKMARK,
    id: collectionId,
    index,
    draggableId: id,
  };
  const dropDestination: DndDestination = {
    type: DraggableItemTypes.BOOKMARK,
    id: collectionId,
    index,
  };

  return (
    <DragDropWrapper
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
          draggingItemId={draggingItemId}
          isDragging={isDragging}
        />
      </CardWrapper>
    </DragDropWrapper>
  );
};

export default Card;

type PropTypes = {
  bookmark: Bookmark
  index: number
  collectionId: string
  draggingItemId?: string | null
  setDraggingItemId: Dispatch<string | null | undefined>
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const CardWrapper = styled(PrimaryCard)`
  overflow: hidden;
  text-decoration: none;
  cursor: grab;
`;
