import React from 'react';
import BMGridCollection from "./bm-grid-collection";

const BMGrid = ({ bookmarks = [], collections = [] }) => (
  <div>
    {
      collections.map((record) => {
        const filteredBookmarks = bookmarks.filter(({ collectionId }) => collectionId === record.id);
        return <BMGridCollection key={record.id} bookmarks={filteredBookmarks} {...record}/>
      })
    }
  </div>
);

export default BMGrid;
