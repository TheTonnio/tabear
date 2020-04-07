import { ACTION_TYPE } from "../constants/action-types";
import v4 from "uuid/v4";
import {Bookmark} from "../models/bookmark";
import {Collections} from "../models/collections";
import {Bookmarks} from "../models/bookmarks";

export const addBookmark = (bookmark: Bookmark) => ({
  type: ACTION_TYPE.ADD_BOOKMARK,
  bookmark
});

export const deleteBookmark = (id: string, collectionId: string) => ({
  type: ACTION_TYPE.REMOVE_BOOKMARK,
  id,
  collectionId,
});

export const setBookmarks = (bookmarks: Bookmarks) => ({
  type: ACTION_TYPE.SET_COLLECTIONS,
  bookmarks
});
