import React from 'react';
import BookmarksGridItem from './bookmarks-grid-item';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';

const BookmarksGridCollection = ({
  bookmarks, record, onAddBookmarkButtonClick,
}: PropTypes) => {
  const {
    id, name, description, emoji,
  } = record;

  return (
    <div>
      <h1>{`${emoji} ${name}`}</h1>
      <h2>{description}</h2>
      <div>
        {
          bookmarks.map((bookmark) => (
            <BookmarksGridItem
              key={bookmark.id}
              record={bookmark}
            />
          ))
        }
        <button type="button" onClick={() => onAddBookmarkButtonClick(id)}>Add Bookmark +</button>
      </div>
    </div>
  );
};

export default BookmarksGridCollection;

type PropTypes = {
  bookmarks: Bookmark[]
  record: Collection
  onAddBookmarkButtonClick: (id:string) => void
}
