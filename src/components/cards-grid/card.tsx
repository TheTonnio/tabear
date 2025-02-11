// @ts-nocheck
import React, {Dispatch, useContext, useRef, useState} from 'react'
import styled from "styled-components";
import { PrimaryCard } from "../../shared/styles/primary-card";
import { DraggableItemTypes } from "../../constants";
import { Bookmark } from "../models/bookmark";
import CardInfo from "./card-info";
import DragDropWrapper from "../dnd/drag-drop-wrapper";
import { DnDSource } from "../../models/dnd-source";
import {ConfigContext} from "../../store/config-context";

const Card = (props : PropTypes) => {
  const {
    bookmark,
    index,
    draggingItemId,
    moveCard,
    setDraggingItemId,
    collectionId,
    onBookmarkUpdate,
    onBookmarkRemove,
  } = props;
  const { url, iconUrl, name, description, id } = bookmark;
  const [ isEditing, setEditingMode ] = useState(false);

  const { layoutType } = useContext(ConfigContext);
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

  const onEdit = (e) => {
    e.preventDefault();
    setEditingMode(true);
  };

  const onFinishEdit = () => {
    setEditingMode(false);
  };

  const onRemove = (e) => {
    e.preventDefault();
    onBookmarkRemove(bookmark.id, collectionId);
  };

  const onCardSave = ({ name, description }) => {
    onBookmarkUpdate(name, description)
  };

  const onCardClick = (e) => {
    if (isEditing) {
      e.preventDefault();
    }
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
        onClick={onCardClick}
      >
        <CardInfo
          layoutType={layoutType}
          name={name}
          description={description}
          url={url}
          iconUrl={iconUrl}
          draggingItemId={draggingItemId}
          isDragging={isDragging}
          isEditing={isEditing}
          onEdit={onEdit}
          onSave={onCardSave}
          onRemove={onRemove}
          onFinishEdit={onFinishEdit}
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
  setDraggingItemId: Dispatch<string | undefined>
  moveCard: (source: any, destination: any, draggableId: string) => void
  onBookmarkUpdate: (name: string, description: string) => any
  onBookmarkRemove: (id: string, collectionId: string) => any
}

const CardWrapper = styled(PrimaryCard)`
  overflow: hidden;
  text-decoration: none;
  cursor: grab;
`;
