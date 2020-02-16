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
import {LayoutType} from "../models/layout-type";

const BookmarkCollection = ({
  bookmarks,
  collection,
  onAddBookmarkButtonClick,
  moveCard,
  setDraggableItem,
  draggableItemId,
  layoutType,
}: PropTypes) => {
  const {
    id, name, description,
  } = collection;

  const [ isCollapsed, toggleCollection ] = useState<boolean>(false);

  const [, drop] = useDrop({
    accept: DraggableItemTypes.BOOKMARK,
    hover(source: DraggableBookmark) {
      const destinationIndex = 0;
      const destination = {
        type: DraggableItemTypes.BOOKMARK,
        id,
        index: destinationIndex
      };

      if (source.id !== id) {
        moveCard(source, destination, source.draggableId);
        source.index = destinationIndex;
        source.id = id;
      }
    },
  });

  return (
    <Wrapper ref={drop}>
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
  layoutType: LayoutType
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const Wrapper = styled.div`
  margin: 20px 0;
  padding: 0 20px;
  width: 100%;
  break-inside: avoid;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
  grid-auto-rows: 130px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

