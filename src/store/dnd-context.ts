import React from 'react';

export const DnDContext = React.createContext<any>({
  draggingBookmarkId: undefined,
  draggingCollectionId: undefined,
  setDraggingBookmarkId: undefined as any,
  setDraggingCollectionId: undefined as any,
});
