import React, {useCallback} from 'react';
import BookmarksGridCollection from './bookmarks-grid-collection';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';
import update from "immutability-helper";

const BookmarksGrid = ({
  bookmarks = [],
  collections = [],
  onAddBookmarkButtonClick,
  onBookmarksUpdate,
  updateBookmark,
}: PropTypes) => {
  const setCards = (updatedBookmarks: Bookmark[]) => onBookmarksUpdate(updatedBookmarks);
  // const moveCard = useCallback(
  //   (dragIndex: number, hoverIndex: number) => {
  //     const dragCard = bookmarks[dragIndex];
  //     setCards(
  //       update(bookmarks, {
  //         $splice: [
  //           [dragIndex, 1],
  //           [hoverIndex, 0, dragCard],
  //         ],
  //       }),
  //     )
  //   },
  //   [bookmarks],
  // );

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
  //
  // const handleDrop = useCallback(
  //   (index, item, collectionId) => {
  //     if (collectionId !== item.rawRecord.collectionId) {
  //       const upd = updateBookmark({ ...item.rawRecord, collectionId }) as Bookmark[];
  //       onBookmarksUpdate(upd);
  //     }
  //   },
  //   [collections],
  // );
  const mappedBookmarks = bookmarks.map((item: any, index: any) => ({ ...item, index }));

  return (
    <div>
      {
        collections.map((collection, index: number) => {
          const filteredBookmarks = mappedBookmarks
            .filter(({ collectionId }) => collectionId === collection.id);

          return (
            <BookmarksGridCollection
              key={collection.id}
              bookmarks={filteredBookmarks}
              onAddBookmarkButtonClick={onAddBookmarkButtonClick}
              moveCard={moveCard}
              record={collection}
              collectionIndex={index}
              // onDrop={item => handleDrop(index, item, collection.id)}
            />
          );
        })
      }
    </div>)
};

export default BookmarksGrid;

type PropTypes = {
  bookmarks: Bookmark[]
  collections: Collection[]
  onAddBookmarkButtonClick: (id: string) => void
  onBookmarksUpdate: (items: Bookmark[]) => void
  updateBookmark: (item: Bookmark) => any
}
