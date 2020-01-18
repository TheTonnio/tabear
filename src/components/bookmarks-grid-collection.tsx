import React from 'react';
import BookmarksGridItem from './bookmarks-grid-item';
import {Bookmark} from "../../models/bookmark";

const BookmarksGridCollection = ({
  bookmarks, id, name, description, emoji, onAddBookmarkButtonClick,
}: PropTypes) => (
  <div>
    <h1>{`${emoji} ${name}`}</h1>
    <h2>{description}</h2>
    <div>
      {
        bookmarks.map((item) => <BookmarksGridItem key={item.id} {...item} />)
      }
      <button onClick={() => onAddBookmarkButtonClick(id)}>Add Bookmark +</button>
    </div>
  </div>
);

export default BookmarksGridCollection;

type PropTypes = {
  bookmarks: Bookmark[]
  id: string
  name: string
  description: string
  emoji: string
  onAddBookmarkButtonClick: (id:string) => void
}
