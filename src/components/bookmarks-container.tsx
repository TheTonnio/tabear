import React, {useContext, useReducer, useState} from 'react';
import { Bookmarks } from "../models/bookmarks";
import { Collections } from "../models/collections";
import { LayoutType } from "../models/layout-type";
import LayoutResolver from "./layout-resolver";
import {Bookmark} from "../models/bookmark";
import {Collection} from "../models/collection";
import {bookmarksReducer} from "../reducers/bookmarks";
import {AppDataContext} from "../store/app-data-context";
import AppDataProvider from "./app-data-provider";
import {setCollections, updateCollection} from "../actions/collections";
import {getBookmarkFromTab} from "../utils/get-bookmark-from-tab";
import {addBookmark, setBookmarks} from "../actions/bookmarks";
import {setCollectionsOrder} from "../actions/collections-order";

const BookmarksContainer = (props: any) => {
  const {
    layoutType,
    // bookmarks,
    // collections,
    // collectionsOrder,
    // onCollectionsUpdate,
    // onBookmarksUpdate,
    // onCollectionsOrderUpdate,
    isSearchMode,
  } = props;

  const [ draggingItemId, setDraggingItemId] = useState<string | undefined>();
  const [ draggingCollectionItemId, setDraggingItemCollectionId] = useState<string | undefined>();
  const { bookmarks, collections, collectionsOrder, filteredBookmarks, dispatch }: any = useContext(AppDataContext);
  console.log(2);
  const onCollectionsUpdate = (collections: Collections) => dispatch(setCollections(collections));

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

      onCollectionsUpdate({
        ...collections,
        [newCollection.id]: newCollection
      });

      return;
    }

    // If new tab dropped in a collection
    if (!start) {
      const finishBookmarkIds = Array.from(finish.bookmarksIds);
      dispatch(addBookmark(getBookmarkFromTab(source.overload, draggableId)));
      finishBookmarkIds.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        bookmarksIds: finishBookmarkIds
      };

      onCollectionsUpdate({
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

    onCollectionsUpdate({
      ...collections,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    });
  };

  const moveCollection = (source: any, destination: any, draggableId: string) => {
    if (!destination) {
      return
    }

    if (
      destination.id === source.id &&
      destination.index === source.index
    ) {
      return
    }

    const newCollectionOrder = [ ...collectionsOrder ];
    newCollectionOrder.splice(source.index, 1);
    newCollectionOrder.splice(destination.index, 0, draggableId);
    dispatch(setCollectionsOrder(newCollectionOrder));

    return
  };

  const onCollectionUpdate = (collection: Collection) => {
    dispatch(updateCollection(collection));
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

    relatedBookmarksIds.forEach((bookmarkId: string) => delete newBookmarksObj[bookmarkId]);
    delete newCollectionsObj[id];
    newCollectionsOrder.splice(relatedIdOrderIndex, 1);

    dispatch(setCollectionsOrder(newCollectionsOrder));
    dispatch(setCollections(newCollectionsObj));
    dispatch(setBookmarks(newBookmarksObj));
  };

  const onBookmarkRemove = (id: string, collectionId: string) => {
    const newBookmarksObj = { ...bookmarks };
    const newCollectionObj = { ...collections[collectionId] };
    const relatedIdIndex = newCollectionObj.bookmarksIds.indexOf(id);

    newCollectionObj.bookmarksIds.splice(relatedIdIndex, 1);
    delete newBookmarksObj[id];

    dispatch(setBookmarks(newBookmarksObj));
    onCollectionUpdate(newCollectionObj);
  };

  return (
    <LayoutResolver
      layoutType={layoutType}
      bookmarks={isSearchMode ? filteredBookmarks : bookmarks}
      collections={collections}
      collectionsOrder={collectionsOrder}
      moveCard={moveCard}
      moveCollection={moveCollection}
      setDraggingItemId={setDraggingItemId}
      setDraggingItemCollectionId={setDraggingItemCollectionId}
      draggingItemId={draggingItemId}
      draggingCollectionItemId={draggingCollectionItemId}
      isSearchMode={isSearchMode}
      onBookmarkUpdate={() => {}}
      onBookmarkRemove={() => {}}
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
  layoutType: LayoutType
  isSearchMode: boolean
  isDataLoaded: boolean
}
