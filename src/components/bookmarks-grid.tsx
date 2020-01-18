import React from 'react';
import BookmarksGridCollection from './bookmarks-grid-collection';
import { Bookmark } from "../../models/bookmark";
import { Collection } from "../../models/collection";

const BookmarksGrid = ({ bookmarks = [], collections = [], onAddBookmarkButtonClick }: PropTypes) => (
  <div>
    {
      collections.map((record) => {
        const filteredBookmarks = bookmarks.filter(({ collectionId }) => collectionId === record.id);
        return <BookmarksGridCollection
          key={record.id}
          bookmarks={filteredBookmarks}
          onAddBookmarkButtonClick={onAddBookmarkButtonClick}
          {...record}
        />;
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

