import React from 'react';
import BookmarksGridCollection from './bookmarks-grid-collection';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';

const BookmarksGrid = ({
  bookmarks = [],
  collections = [],
  onAddBookmarkButtonClick,
}: PropTypes) => (
  <div>
    {
      collections.map((collection) => {
        const filteredBookmarks = bookmarks
          .filter(({ collectionId }) => collectionId === collection.id);
        return (
          <BookmarksGridCollection
            key={collection.id}
            bookmarks={filteredBookmarks}
            onAddBookmarkButtonClick={onAddBookmarkButtonClick}
            record={collection}
          />
        );
      })
    }
  </div>
);

export default BookmarksGrid;

type PropTypes = {
  bookmarks: Bookmark[]
  collections: Collection[]
  onAddBookmarkButtonClick: (id: string) => void
}
