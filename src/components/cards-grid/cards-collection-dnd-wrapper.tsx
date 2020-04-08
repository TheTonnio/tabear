import React, { useContext, useRef, useState } from 'react';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';
import styled from "styled-components";
import Card from "./card";
import CardsCollectionHeader from "./cards-collection-header";
import { LayoutType } from "../../models/layout-type";
import CardsPlaceholder from "./cards-placeholder";
import { ConfigContext } from "../../store/config-context";
import { DnDDestination } from "../../models/dnd-destination";
import {
  CARD_HEIGHT,
  CARD_ROW_GAP, CARDS_PLACEHOLDER_HEIGHT,
  COLLECTION_BOTTOM_MARGIN,
  COLLECTION_TOP_MARGIN, CONTAINER_MARGIN,
  DraggableItemTypes,
  WRAPPER_MARGIN
} from "../../constants";
import { getMaxGridCollectionHeight } from "../../utils/get-max-grid-collection-height";
import { CollectionEditableFields } from "../../models/collection-editable-fields";
import ConfirmationCover from "../confiramtion-cover";
import { DnDSource } from "../../models/dnd-source";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { editBookmark, removeBookmark, removeBookmarks } from "../../actions/bookmarks";
import {
  editCollection,
  removeBookmarkFromCollection,
  removeCollection,
  toggleCollection
} from "../../actions/collections";
import { removeCollectionFromOrder } from "../../actions/collections-order";
import { DnDContext } from "../../store/dnd-context";
import { AppConfig } from "../../models/app-config";

const CardsCollection = React.memo((props: any) => {
  const {
    bookmarks,
    collection,
    moveCard,
    moveCollection,
    collectionIndex,
    onDispatch,
  } = props;
  const { id, name, isCollapsed } = collection;

  const { draggingCollectionId, draggingBookmarkId, setDraggingBookmarkId } = useContext(DnDContext);
  const { maxItemsPerRow } = useContext<AppConfig>(ConfigContext);
  const [ isConfirmationModalShown, setConfirmationModalShownState ] = useState<boolean>(false);

  const hasBookmarks = !!(bookmarks && bookmarks.length);
  const rows = Math.ceil((bookmarks && bookmarks.length || 4) / maxItemsPerRow); // TODO: Do smthing
  const maxCollectionHeight = getMaxGridCollectionHeight(isCollapsed, rows);

  const isDragging = draggingCollectionId === id;

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

  const handleCollectionSave = ({ name }: CollectionEditableFields) => {
    onDispatch(editCollection(id, name));
  };

  const handleCollectionRemove = ({ id, bookmarksIds }: Collection) => {
    onDispatch(removeBookmarks(bookmarksIds));
    onDispatch(removeCollectionFromOrder(id));
    onDispatch(removeCollection(id));
  };

  const handleBookmarkRemove = (bookmarkId: string, collectionId: string) => {
    onDispatch(removeBookmarkFromCollection(bookmarkId, collectionId));
    onDispatch(removeBookmark(bookmarkId));
  };

  const handleBookmarkSave = (id: string, name: string, description: string) => {
    onDispatch(editBookmark(id, name, description));
  };

  return (
    <OuterWrapper
      isDragging={isDragging}
      ref={dropRef}
    >
      <Wrapper ref={preview}>
        <CardsCollectionHeader
          dragRef={dragRef}
          name={name}
          isCollectionCollapsed={isCollapsed}
          onSave={handleCollectionSave}
          toggleCollection={() => onDispatch(toggleCollection(id))}
          onRemove={() => setConfirmationModalShownState(true)}
        />
        <InnerWrapper
          maxCollectionHeight={maxCollectionHeight}
          hasBookmarks={isCollapsed || hasBookmarks}
        >
          {
            hasBookmarks
              ? (
                <Grid>
                  {
                    bookmarks.map((bookmark: Bookmark, index: number) => (
                      <Card
                        key={bookmark.id}
                        index={index}
                        collectionId={id}
                        bookmark={bookmark}
                        draggingItemId={draggingBookmarkId}
                        moveCard={moveCard}
                        setDraggingItemId={setDraggingBookmarkId}
                        onBookmarkUpdate={(name: string, description: string) => handleBookmarkSave(bookmark.id, name, description)}
                        onBookmarkRemove={() => handleBookmarkRemove(bookmark.id, id)}
                      />
                    ))
                  }
                </Grid>
              ) : <CardsPlaceholder/>
          }
        </InnerWrapper>

        <ConfirmationCover
          text={"Are you sure to delete this collection?"}
          isHidden={!isConfirmationModalShown}
          onConfirm={() => handleCollectionRemove(collection)}
          onCancel={() => setConfirmationModalShownState(false)}
          confirmButtonText={"Confirm"}
          cancelButtonText={"Cancel"}
        />
      </Wrapper>
    </OuterWrapper>
  );
});

export default CardsCollection;

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

