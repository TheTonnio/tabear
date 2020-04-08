import { ACTION_TYPE } from "../constants/action-types";
import v4 from "uuid/v4";
import {Collection} from "../models/collection";
import {Collections} from "../models/collections";

export const addCollection = () => ({
  type: ACTION_TYPE.ADD_COLLECTION,
  id: v4(),
  name: "New Collection",
  bookmarksIds: [],
  isCollapsed: false,
});

export const updateCollection = (collection: Collection) => ({
  type: ACTION_TYPE.UPDATE_COLLECTION,
  collection,
});

export const editCollection = (id: string, name: string) => ({
  type: ACTION_TYPE.EDIT_COLLECTION,
  id,
  name,
});

export const removeCollection = (id: string) => ({
  type: ACTION_TYPE.REMOVE_COLLECTION,
  id,
});

export const toggleCollection = (id: string) => ({
  type: ACTION_TYPE.TOGGLE_COLLECTION,
  id,
});

export const setCollections = (collections: Collections) => ({
  type: ACTION_TYPE.SET_COLLECTIONS,
  collections,
});

export const removeBookmarkFromCollection = (bookmarkId: string, collectionId: string) => ({
  type: ACTION_TYPE.REMOVE_BOOKMARK_FROM_COLLECTION,
  bookmarkId,
  collectionId,
});
