import React, { useContext, useState } from 'react';
import LayoutResolver from "./layout-resolver";
import { AppDataContext } from "../store/app-data-context";
import { Collections } from "../models/collections";
import { LayoutType } from "../models/layout-type";
import { addBookmark } from "../actions/bookmarks";
import { setCollections } from "../actions/collections";
import { updateCollectionsOrders } from "../actions/collections-order";
import { moveCollection } from '../utils/dnd/move-collection';
import { DnDSource } from "../models/dnd-source";
import { DnDDestination } from "../models/dnd-destination";
import { moveBookmark } from "../utils/dnd/move-bookmark";
import { Bookmark } from "../models/bookmark";

const BookmarksContainer = (props: PropTypes) => {
  const {
    layoutType,
    isSearchMode,
  } = props;

  const [ draggingItemId, setDraggingItemId] = useState<string | undefined>();
  const [ draggingCollectionItemId, setDraggingItemCollectionId] = useState<string | undefined>();
  const { bookmarks, collections, collectionsOrder, filteredBookmarks, dispatch }: any = useContext(AppDataContext);

  const handleCollectionMove = (source: DnDSource, destination: DnDDestination, draggableId: string) => {
    moveCollection(
      source,
      destination,
      draggableId,
      (id: string, fromIndex: number, toIndex: number) => dispatch(updateCollectionsOrders(id, fromIndex, toIndex)));
  };

  const handleBookmarkMove = (source: DnDSource, destination: DnDDestination, draggableId: string) => {
    moveBookmark(
      collections,
      source,
      destination,
      draggableId,
      (collections: Collections) => dispatch(setCollections(collections)),
      (bookmark: Bookmark) => dispatch(addBookmark(bookmark)),
    );
  };

  return (
    <LayoutResolver
      layoutType={layoutType}
      bookmarks={isSearchMode ? filteredBookmarks : bookmarks}
      collections={collections}
      collectionsOrder={collectionsOrder}
      moveCard={handleBookmarkMove}
      moveCollection={handleCollectionMove}
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
  layoutType: LayoutType
  isSearchMode: boolean
}
