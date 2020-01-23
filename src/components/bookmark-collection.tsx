import React, { Dispatch } from 'react';
import { Bookmark } from '../models/bookmark';
import { Collection } from '../models/collection';
import styled from "styled-components";
import { PrimaryCard } from "../shared/styles/primary-card";
import { useDrop } from 'react-dnd'
import BookmarkCard from "./bookmark-card";
import { DraggableItemTypes } from "../constants";
import DraggableBookmark from "../models/draggable-bookmark";
import BookmarkCardAddButton from "./bookmark-card-add-button";

const BookmarkCollection = ({
  bookmarks,
  record,
  onAddBookmarkButtonClick,
  moveCard,
  setDraggableItem,
  draggableItemId
}: PropTypes) => {
  const {
    id, name, description,
  } = record;

  const [, drop] = useDrop({
    accept: DraggableItemTypes.BOOKMARK,
    hover(dragItem: DraggableBookmark) {
      const { id: dragItemId, collectionId: dragItemCollectionId } = dragItem;
      if (dragItemCollectionId !== id) {
        moveCard(dragItemId, -1, -1, dragItemCollectionId, id);
        dragItem.collectionId = id
      }
    },
  });

  return (
    <Wrapper ref={drop}>
      <Header>
        <Title>{name}</Title>
        <Description>{description}</Description>
      </Header>
      <Grid>
        {
          bookmarks.map((bookmark: IndexedBookmark) => (
            <BookmarkCard
              key={bookmark.id}
              index={bookmark.index}
              record={bookmark}
              isDragging={bookmark.id === draggableItemId}
              moveCard={moveCard}
              setDraggableItem={setDraggableItem}
            />
          ))
        }
        <BookmarkCardAddButton onAddClick={() => onAddBookmarkButtonClick(id)}/>
      </Grid>
    </Wrapper>
  );
};

export default BookmarkCollection;

type PropTypes = {
  bookmarks: IndexedBookmark[]
  record: Collection
  collectionIndex: number
  draggableItemId: string | null
  onAddBookmarkButtonClick: (id: string) => void
  setDraggableItem: Dispatch<string | null>
  moveCard: (id: string, fromIndex: number, toIndex: number, fromContainerId: string, toContainerId: string) => void
}

interface IndexedBookmark extends Bookmark {
  index: number
}

const Wrapper = styled.div`
  margin: 50px 0;
  padding: 0 20px;
  width: 100%;
`;

const Header = styled(PrimaryCard)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px 12px;
  margin: 0 auto 20px;
`;

const Title = styled.span`
  position: relative;
  padding-right: 10px;
  font-size: 18px;
  font-weight: bold;
  
  &::after {
  content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: #3c78bf;
    width: 1px;
    height: 100%;
  }
`;

const Description = styled.span`
  margin-top: -1px;
  padding-left: 10px;
  color: #3c78bf;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
  grid-auto-rows: 130px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;
