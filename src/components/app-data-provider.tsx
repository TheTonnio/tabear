import React, {useEffect, useReducer} from 'react';
import {bookmarksReducer} from "../reducers/bookmarks";
import {AppDataContext} from "../store/app-data-context";

const AppDataProvider = ({ collections, bookmarks, children }: any) => {
  const [state, dispatch] = useReducer(bookmarksReducer, { collections: collections, bookmarks: bookmarks });
  useEffect(() => {
    dispatch && dispatch({ type: "loadData", data: {
        collections, bookmarks
      }} as any)
  });

  return (
    <AppDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppDataContext.Provider>)
};

export default AppDataProvider;
