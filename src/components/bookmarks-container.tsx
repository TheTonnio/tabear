import React, { useContext, useState } from 'react';
import LayoutResolver from "./layout-resolver";
import { AppDataContext } from "../store/app-data-context";
import { Bookmarks } from "../models/bookmarks";
import { Collections } from "../models/collections";
import { LayoutType } from "../models/layout-type";
import { addBookmark } from "../actions/bookmarks";
import { getBookmarkFromTab } from "../utils/get-bookmark-from-tab";
import { setCollections } from "../actions/collections";
import { setCollectionsOrder } from "../actions/collections-order";

const BookmarksContainer = (props: any) => {
  const {
    layoutType,
    isSearchMode,
  } = props;

  const [ draggingItemId, setDraggingItemId] = useState<string | undefined>();
  const [ draggingCollectionItemId, setDraggingItemCollectionId] = useState<string | undefined>();
  const { bookmarks, collections, collectionsOrder, filteredBookmarks, dispatch }: any = useContext(AppDataContext);
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
      onDispatch={dispatch}
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
