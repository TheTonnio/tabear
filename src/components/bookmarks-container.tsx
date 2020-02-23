import React, { useState } from 'react';
import BookmarkCollection from './cards-grid/cards-collection';
import { Bookmark } from '../models/bookmark';
import { Collection } from '../models/collection';
import {Bookmarks} from "../models/bookmarks";
import {Collections} from "../models/collections";
import {LayoutType} from "../models/layout-type";
import styled from "styled-components";
import LayoutResolver from "./layout-resolver";
import {LAYOUT_TYPES_CODES} from "../constants";

const BookmarksContainer = (props: PropTypes) => {
  const {
    bookmarks,
    collections,
    collectionsOrder,
    onAddBookmarkButtonClick,
    onBookmarksUpdate,
    onCollectionsUpdate,
    layoutType,
  } = props;

  const layoutComponentName = getLayoutComponentName(layoutType);
  const [ draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const setCards = (updatedCollections: Collections) => onCollectionsUpdate(updatedCollections);
  const moveCard = (source: any, destination: any, draggableId: string) => {
    if (!destination) {
      return
    }

    if (
      destination.id === source.id &&
      destination.index === source.index
    ) {
      return
    }

    const start = collections[source.id];
    const finish = collections[destination.id];


    if (start === finish) {
      const newBookmarkIds = Array.from(start.bookmarksIds);
      newBookmarkIds.splice(source.index, 1);
      newBookmarkIds.splice(destination.index, 0, draggableId);

      const newCollection = {
        ...start,
        bookmarksIds: newBookmarkIds
      };

      setCards({
        ...collections,
        [newCollection.id]: newCollection
      });

      return;
    }

    const startBookmarkIds = Array.from(start.bookmarksIds);
    startBookmarkIds.splice(source.index, 1);
    const newStart = {
      ...start,
      bookmarksIds: startBookmarkIds
    };

    const finishBookmarkIds = Array.from(finish.bookmarksIds);
    finishBookmarkIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      bookmarksIds: finishBookmarkIds
    };

    setCards({
      ...collections,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    });
  };

  return (
    <LayoutResolver
      layoutType={layoutType}
      collectionsOrder={collectionsOrder}
      onAddBookmarkButtonClick={onAddBookmarkButtonClick}
      moveCard={moveCard}
      setDraggingItemId={setDraggingItemId}
      draggingItemId={draggingItemId}
      bookmarks={bookmarks}
      collections={collections}
    />
  )
};

export default BookmarksContainer;

function getLayoutComponentName(layoutName: string) {
  switch (layoutName) {
    case LAYOUT_TYPES_CODES.List:
      return "cards-grid/cards-grid";
    case LAYOUT_TYPES_CODES.Grid:
      return "cards-grid/cards-grid";
  }
};

type PropTypes = {
  bookmarks: Bookmarks
  collections: Collections
  collectionsOrder: string[]
  onAddBookmarkButtonClick: (id: string) => void
  onBookmarksUpdate: (items: Bookmarks) => void
  onCollectionsUpdate: (items: Collections) => void
  layoutType: LayoutType
}
