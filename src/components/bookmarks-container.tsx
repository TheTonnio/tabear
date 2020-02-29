import React, { useState } from 'react';
import { Bookmarks } from "../models/bookmarks";
import { Collections } from "../models/collections";
import { LayoutType } from "../models/layout-type";
import LayoutResolver from "./layout-resolver";
import v4 from "uuid/v4";
import {Bookmark} from "../models/bookmark";
type Tab = chrome.tabs.Tab;

const BookmarksContainer = (props: PropTypes) => {
  const {
    bookmarks,
    collections,
    collectionsOrder,
    onAddBookmarkButtonClick,
    onAddBookmark,
    onCollectionsUpdate,
    layoutType,
  } = props;

  const [ draggingItemId, setDraggingItemId] = useState<string | null | undefined>(null);
  const createBookmarkFromTab = (tab: Tab, id: string) => ({
    id: id,
    name: tab.title,
    description: tab.title,
    url: tab.url,
    iconUrl: null
  });
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

    // If new tab dropped in a collection
    if (!start) {
      const finishBookmarkIds = Array.from(finish.bookmarksIds);
      const newBookmark = createBookmarkFromTab(source.overload, draggableId);
      onAddBookmark(newBookmark as any);
      console.log(destination.index);
      finishBookmarkIds.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        bookmarksIds: finishBookmarkIds
      };

      setCards({
        ...collections,
        [newFinish.id]: newFinish
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

type PropTypes = {
  bookmarks: Bookmarks
  collections: Collections
  collectionsOrder: string[]
  onAddBookmarkButtonClick: (id: string) => void
  onAddBookmark: (bookmark: Bookmark) => void
  onBookmarksUpdate: (items: Bookmarks) => void
  onCollectionsUpdate: (items: Collections) => void
  layoutType: LayoutType
}
