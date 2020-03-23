import React, { useState } from 'react';
import { Bookmarks } from "../models/bookmarks";
import { Collections } from "../models/collections";
import { LayoutType } from "../models/layout-type";
import LayoutResolver from "./layout-resolver";
import {Bookmark} from "../models/bookmark";
import {Collection} from "../models/collection";
type Tab = chrome.tabs.Tab;

const BookmarksContainer = (props: PropTypes) => {
  const {
    layoutType,
    bookmarks,
    collections,
    collectionsOrder,
    onCollectionsUpdate,
    onBookmarksUpdate,
    onCollectionsOrderUpdate,
    isSearchMode,
  } = props;

  const [ draggingItemId, setDraggingItemId] = useState<string | undefined>();
  const [ draggingCollectionItemId, setDraggingItemCollectionId] = useState<string | undefined>();

  const getBookmarkFromTab = (tab: Tab, id: string) => ({
    id: id,
    name: tab.title,
    description: tab.title,
    url: tab.url,
    iconUrl: tab.favIconUrl
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
      const newBookmark = getBookmarkFromTab(source.overload, draggableId);
      onBookmarkCreate(newBookmark as any);
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

  const moveCollection = (source: any, destination: any, draggableId: string) => {
    const newCollectionOrder = [ ...collectionsOrder ];
    console.log(source.index, destination.index);
    if (source.index !== destination.index) {
      newCollectionOrder.splice(source.index, 1);
      newCollectionOrder.splice(destination.index, 0, draggableId);
      onCollectionsOrderUpdate(newCollectionOrder);
    }
  };

  const onCollectionUpdate = (collection: Collection) => {
    const newCollectionsObj = {
      ...collections,
      [collection.id]: collection
    };

    onCollectionsUpdate(newCollectionsObj);
  };

  const onCollectionRemove = (id: string) => {
    const newCollectionsOrder = [ ...collectionsOrder ];
    const newCollectionsObj = { ...collections };
    const newBookmarksObj = { ...bookmarks };

    const relatedIdOrderIndex = newCollectionsOrder.indexOf(id);
    const relatedCollection = newCollectionsObj[id];
    const relatedBookmarksIds = relatedCollection
      && relatedCollection.bookmarksIds
      && relatedCollection.bookmarksIds.length
      ? newCollectionsObj[id].bookmarksIds
      : [];

    relatedBookmarksIds.forEach(bookmarkId => delete newBookmarksObj[bookmarkId]);
    delete newCollectionsObj[id];
    newCollectionsOrder.splice(relatedIdOrderIndex, 1);

    onCollectionsOrderUpdate(newCollectionsOrder);
    onCollectionsUpdate(newCollectionsObj);
    onBookmarksUpdate(newBookmarksObj);
  };

  const onBookmarkUpdate = (bookmark: Bookmark) => {
    onBookmarksUpdate({
      ...bookmarks,
      [bookmark.id]: bookmark
    });
  };

  const onBookmarkCreate = onBookmarkUpdate;

  const onBookmarkRemove = (id: string, collectionId: string) => {
    const newBookmarksObj = { ...bookmarks };
    const newCollectionObj = { ...collections[collectionId] };
    const relatedIdIndex = newCollectionObj.bookmarksIds.indexOf(id);

    newCollectionObj.bookmarksIds.splice(relatedIdIndex, 1);
    delete newBookmarksObj[id];

    onBookmarksUpdate(newBookmarksObj);
    onCollectionUpdate(newCollectionObj);
  };

  return (
    <LayoutResolver
      layoutType={layoutType}
      collectionsOrder={collectionsOrder}
      moveCard={moveCard}
      moveCollection={moveCollection}
      setDraggingItemId={setDraggingItemId}
      setDraggingItemCollectionId={setDraggingItemCollectionId}
      draggingItemId={draggingItemId}
      draggingCollectionItemId={draggingCollectionItemId}
      bookmarks={bookmarks}
      collections={collections}
      isSearchMode={isSearchMode}
      onBookmarkUpdate={onBookmarkUpdate}
      onBookmarkRemove={onBookmarkRemove}
      onCollectionUpdate={onCollectionUpdate}
      onCollectionRemove={onCollectionRemove}
    />
  )
};

export default BookmarksContainer;

type PropTypes = {
  bookmarks: Bookmarks
  collections: Collections
  collectionsOrder: string[]
  onBookmarksUpdate: (data: Bookmarks) => void
  onCollectionsUpdate: (data: Collections) => void
  onCollectionsOrderUpdate: (data: string[]) => void
  layoutType: LayoutType
  isSearchMode: boolean
}
