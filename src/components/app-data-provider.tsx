import React, {useReducer} from 'react';
import {bookmarksReducer} from "../reducers/bookmarks";
import {AppDataContext} from "../store/app-data-context";
import {AppData} from "../models/app-data";
import {rootReducer} from "../reducers";

const AppDataProvider = ({ data,  children }: PropTypes) => {
  const [ state, dispatch ] = useReducer(rootReducer, { ...data });

  return (
    // @ts-ignore
    <AppDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppDataContext.Provider>)
};

interface PropTypes {
  data: AppData
  children: JSX.Element | JSX.Element[]
}

export default AppDataProvider;
