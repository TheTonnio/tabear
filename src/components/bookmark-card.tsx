import React, { Dispatch, useRef } from 'react'
import styled from "styled-components";
import { PrimaryCardAnimated } from "../shared/styles/primary-card";
import { useDrag, useDrop } from "react-dnd";
import { DraggableItemTypes } from "../constants";
import DraggableBookmark from "../models/draggable-bookmark";
import { Bookmark } from "../models/bookmark";
import BookmarkCardInfo from "./bookmark-card-info";

const BookmarkCard = ({
  record: {
    url,
    iconUrl,
    name,
    description,
    collectionId,
    id
  },
  index,
  isDragging,
  moveCard,
  setDraggableItem
}: PropTypes) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    item: {
      type: DraggableItemTypes.BOOKMARK,
      id,
      collectionId,
      index,
    },
    begin: () => setDraggableItem(id),
    end: () => setDraggableItem(null)
  });

  const [, drop] = useDrop({
    accept: DraggableItemTypes.BOOKMARK,
    hover(dragItem: DraggableBookmark) {
      if (!ref.current) {
        return
      }
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      const {
        id: dragItemId,
        collectionId: dragItemCollectionId,
      } = dragItem;

      if (dragIndex === hoverIndex) {
        return
      }

      moveCard(dragItemId, dragIndex, hoverIndex, dragItemCollectionId, collectionId);
      dragItem.index = hoverIndex
    },
  });

  drag(drop(ref));

  return (
    // @ts-ignore
    <BookmarkCardWrapper
      href={url}
      ref={ref}
      as="a"
      visible={!isDragging}
    >
      <BookmarkCardInfo
        name={name}
        description={description}
        url={url}
        iconUrl={iconUrl}
      />
    </BookmarkCardWrapper>
  );
};

export default BookmarkCard;

type PropTypes = {
  record: Bookmark
  isDragging: boolean
  index: number
  setDraggableItem: Dispatch<string | null>
  moveCard: (dragItemId: string, dragIndex: number, hoverIndex: number, dragItemCollectionId: string, collectionId: string) => void
}

const BookmarkCardWrapper = styled(PrimaryCardAnimated)`
  overflow: hidden;
  text-decoration: none;
  opacity: ${(props: { visible: boolean }) => props.visible ? 1 : .4};
`;
