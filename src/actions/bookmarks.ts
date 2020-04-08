import { ACTION_TYPE } from "../constants/action-types";
import { Bookmark } from "../models/bookmark";
import { Bookmarks } from "../models/bookmarks";
import v4 from "uuid/v4";

export const addBookmark = (bookmark: Bookmark) => ({
  type: ACTION_TYPE.ADD_BOOKMARK,
  bookmark,
});

export const editBookmark = (id: string, name: string, description: string) => ({
  type: ACTION_TYPE.EDIT_BOOKMARK,
  id,
  name,
  description,
});

export const removeBookmark = (id: string) => ({
  type: ACTION_TYPE.REMOVE_BOOKMARK,
  id,
});

export const setBookmarks = (bookmarks: Bookmarks) => ({
  type: ACTION_TYPE.SET_COLLECTIONS,
  bookmarks,
});

export const removeBookmarks = (ids: string[] = []) => ({
  type: ACTION_TYPE.REMOVE_BOOKMARKS,
  ids,
});
