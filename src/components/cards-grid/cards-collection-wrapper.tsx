import React, { useContext, useRef, useState } from 'react';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';
import styled from "styled-components";
import { LayoutType } from "../../models/layout-type";
import { DnDDestination } from "../../models/dnd-destination";
import {
  CARD_HEIGHT,
  CARD_ROW_GAP, CARDS_PLACEHOLDER_HEIGHT,
  COLLECTION_BOTTOM_MARGIN,
  COLLECTION_TOP_MARGIN, CONTAINER_MARGIN,
  DraggableItemTypes,
  WRAPPER_MARGIN
} from "../../constants";
import { DnDSource } from "../../models/dnd-source";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import CardsCollection from "./cards-collection";

const CardsCollectionWrapper = React.memo((props: any) => {
  const {
    bookmarks,
    collection,
    moveCard,
    moveCollection,
    collectionIndex,
    onDispatch,
  } = props;
  const { id } = collection;

  const dragRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const dropDestination: DnDDestination = {
    type: DraggableItemTypes.COLLECTION,
    index: collectionIndex,
    id,
  };

  const dropBookmarkDestination: DnDDestination = {
    type: DraggableItemTypes.BOOKMARK,
    id,
    index: bookmarks.length
  };

  const dragSource: DnDSource = {
    type: DraggableItemTypes.COLLECTION,
    index: collectionIndex,
    id,
    draggableId: id,
  };

  const [, drag, preview] = useDrag({
    item: {
      id: dragSource.id,
      type: dragSource.type,
      index: dragSource.index,
      draggableId: dragSource.draggableId,
    }
  });

  const [, drop] = useDrop({
    accept: [ DraggableItemTypes.BOOKMARK, DraggableItemTypes.TAB, DraggableItemTypes.COLLECTION ],
    hover(source: DnDSource, monitor: DropTargetMonitor) {
      if (!dropRef.current) {
        return
      }

      const clientOffset = monitor.getClientOffset();
      const hoverBoundingRect = dropRef.current!.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if ((source.index as number) < dropDestination.index && hoverClientY < hoverMiddleY) {
        return
      }

      if ((source.index as number) > dropDestination.index && hoverClientY > hoverMiddleY) {
        return
      }

      if (source && (source.type === DraggableItemTypes.BOOKMARK || source.type === DraggableItemTypes.TAB) && source.id !== dropBookmarkDestination.id) {
        moveCard(source, dropBookmarkDestination, source.draggableId);
        source.index = dropBookmarkDestination.index;
        source.id = dropBookmarkDestination.id;
      } else if (source && source.type === DraggableItemTypes.COLLECTION) {
        moveCollection(source, dropDestination, source.draggableId);
        source.index = dropDestination.index;
        source.id = dropDestination.id;
      }
    },
  });

  drop(dropRef);
  drag(dragRef);

  return (
    <CardsCollection
      collectionDropRef={dropRef}
      collectionDragRef={dragRef}
      collectionPreview={preview}
      bookmarks={bookmarks}
      collection={collection}
      moveCard={moveCard}
      onDispatch={onDispatch}
    />
  );
});

export default CardsCollectionWrapper;

type PropTypes = {
  bookmarks: Bookmark[]
  collection: Collection
  collectionIndex: number
  layoutType: LayoutType
  moveCard: (source: any, destination: any, draggableId: string) => void
  moveCollection: (source: any, destination: any, draggableId: string) => void
  onBookmarkUpdate: (data: Bookmark) => void
  onBookmarkRemove: (id: string, collectionId: string) => void
  onCollectionUpdate: (data: Collection) => void
  onCollectionRemove: (id: string) => void
}

const OuterWrapper = styled.div`
  padding: 0 ${CONTAINER_MARGIN}px;
  opacity: ${(props: { isDragging: boolean }) => props.isDragging ? .7 : 1 };
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 0 40px;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

const InnerWrapper = styled.div`
  padding: 0 ${WRAPPER_MARGIN}px 10px;
  height: ${({ hasBookmarks, maxCollectionHeight }: { hasBookmarks: boolean, maxCollectionHeight: number }) => hasBookmarks ? `${maxCollectionHeight}px` : `${CARDS_PLACEHOLDER_HEIGHT}px`};
  transition: height .3s;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
  grid-auto-rows: ${CARD_HEIGHT}px;
  grid-column-gap: 20px;
  grid-row-gap: ${CARD_ROW_GAP}px;
  margin: ${COLLECTION_TOP_MARGIN}px 0 ${COLLECTION_BOTTOM_MARGIN}px;
`;

