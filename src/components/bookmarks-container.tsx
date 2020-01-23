import React, { useState } from 'react';
import BookmarkCollection from './bookmark-collection';
import { Bookmark } from '../models/bookmark';
import { Collection } from '../models/collection';
import update from "immutability-helper";

const BookmarksContainer = (props: PropTypes) => {
  const {
    bookmarks,
    collections,
    onAddBookmarkButtonClick,
    onBookmarksUpdate,
  } = props;

  const [ draggingItemId, setDraggingItemId] = useState<string | null>(null);

  const setCards = (updatedBookmarks: Bookmark[]) => onBookmarksUpdate(updatedBookmarks);
  const moveCard = (id: string, fromIndex: number, toIndex: number, fromContainerId: string, toContainerId: string) => {
    const bookmark: Bookmark | undefined = bookmarks.find((bookmark: any) => bookmark.id === id);
    if (bookmark) {
      bookmark.collectionId = toContainerId;
      let updatedList = bookmarks;

      if (fromIndex > -1 && toIndex > -1) {
        updatedList = update(bookmarks, {
          $splice: [
            [fromIndex, 1],
            [toIndex, 0, bookmark],
          ],
        });
      }

      setCards(updatedList);
    }
  };

  const mappedBookmarks = bookmarks.map((item: any, index: any) => ({...item, index}));

  return (
    <div>
      {
        collections.map((collection, index: number) => {
          const filteredBookmarks = mappedBookmarks
            .filter(({collectionId}) => collectionId === collection.id);

          return (
            <BookmarkCollection
              key={collection.id}
              bookmarks={filteredBookmarks}
              onAddBookmarkButtonClick={onAddBookmarkButtonClick}
              moveCard={moveCard}
              record={collection}
              collectionIndex={index}
              setDraggableItem={setDraggingItemId}
              draggableItemId={draggingItemId}
            />
          );
        })
      }
    </div>)
};

export default BookmarksContainer;

type PropTypes = {
  bookmarks: Bookmark[]
  collections: Collection[]
  onAddBookmarkButtonClick: (id: string) => void
  onBookmarksUpdate: (items: Bookmark[]) => void
}
