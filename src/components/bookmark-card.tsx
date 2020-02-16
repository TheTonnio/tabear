import React, { Dispatch, useRef } from 'react'
import styled from "styled-components";
import { PrimaryCard } from "../shared/styles/primary-card";
import { useDrag, useDrop } from "react-dnd";
import { DraggableItemTypes } from "../constants";
import DraggableBookmark from "../models/draggable-bookmark";
import { Bookmark } from "../models/bookmark";
import BookmarkCardInfo from "./bookmark-card-info";

const BookmarkCard = ({
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
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    item: {
      type: DraggableItemTypes.BOOKMARK,
      id: collectionId,
      index,
      draggableId: id,
    },
    begin: () => setDraggableItem(id),
    end: () => setDraggableItem(null)
  });

  const [, drop] = useDrop({
    accept: DraggableItemTypes.BOOKMARK,
    hover(source: DraggableBookmark) {
      if (!ref.current) {
        return
      }

      const destination = {
        type: DraggableItemTypes.BOOKMARK,
        id: collectionId,
        index
      };

      moveCard(source, destination, source.draggableId);
      source.index = index;
      source.id = collectionId;
    },
  });

  drag(drop(ref));

  return (
    // @ts-ignore
    <Wrapper
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
    </Wrapper>
  );
};

export default BookmarkCard;

type PropTypes = {
  bookmark: Bookmark
  index: number
  collectionId: string
  isDragging: boolean
  setDraggableItem: Dispatch<string | null>
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const Wrapper = styled(PrimaryCard)`
  overflow: hidden;
  text-decoration: none;
  opacity: ${(props: { visible: boolean }) => props.visible ? 1 : .4};
`;
