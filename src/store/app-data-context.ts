import React from 'react';

export const AppDataContext = React.createContext({
  bookmarks: {},
  collections: {},
  dispatch: undefined as any,
});
