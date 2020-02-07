import React, { Dispatch, useState } from 'react';
import { Bookmark } from '../models/bookmark';
import { Collection } from '../models/collection';
import styled from "styled-components";
import { useDrop } from 'react-dnd'
import BookmarkCard from "./bookmark-card";
import { DraggableItemTypes } from "../constants";
import DraggableBookmark from "../models/draggable-bookmark";
import BookmarkCardAddButton from "./bookmark-card-add-button";
import BookmarkCollectionHeader from "./bookmark-collection-header";

const BookmarkCollection = ({
  bookmarks,
  collection,
  onAddBookmarkButtonClick,
  moveCard,
  setDraggableItem,
  draggableItemId
}: PropTypes) => {
  const {
    id, name, description,
  } = collection;

  const [ isCollapsed, toggleCollection ] = useState<boolean>(false);

  // const [, drop] = useDrop({
  //   accept: DraggableItemTypes.BOOKMARK,
  //   hover(dragItem: DraggableBookmark) {
  //     const { id: dragItemId, collectionId: dragItemCollectionId } = dragItem;
  //     if (dragItemCollectionId !== id) {
  //       // moveCard(dragItemId, -1, -1, dragItemCollectionId, id);
  //       dragItem.collectionId = id
  //     }
  //   },
  // });

  return (
    <Wrapper /*ref={drop}*/>
      <BookmarkCollectionHeader
        name={name}
        description={description}
        isCollapsed={isCollapsed}
        toggleCollection={() => toggleCollection(!isCollapsed)}
      />
      {
        isCollapsed || (
          <Grid>
            {
              // @ts-ignore
              bookmarks.map((bookmark: Bookmark, index: number) => (
                <BookmarkCard
                  key={bookmark.id}
                  index={index}
                  collectionId={id}
                  bookmark={bookmark}
                  isDragging={bookmark.id === draggableItemId}
                  moveCard={moveCard}
                  setDraggableItem={setDraggableItem}
                />
              ))
            }
            <BookmarkCardAddButton onAddClick={() => onAddBookmarkButtonClick(id)}/>
          </Grid>
        )
      }
    </Wrapper>
  );
};

export default BookmarkCollection;

type PropTypes = {
  bookmarks: Bookmark[]
  collection: Collection
  collectionIndex: number
  draggableItemId: string | null
  onAddBookmarkButtonClick: (id: string) => void
  setDraggableItem: Dispatch<string | null>
  moveCard: (source: any, destination: any, draggableId: string) => void
}

interface IndexedBookmark extends Bookmark {
  index: number
}

const Wrapper = styled.div`
  margin: 20px 0;
  padding: 0 20px;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
  grid-auto-rows: 130px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

