import { ACTION_TYPE } from "../constants/action-types";
import {Collections} from "../models/collections";

export const collectionsReducer = (state: Collections, action: any) => {
  switch(action.type) {
    case ACTION_TYPE.UPDATE_COLLECTION:
      return {
        ...state,
        [action.collection.id]: action.collection
      };
    case ACTION_TYPE.SET_COLLECTIONS:
      return {
        ...action.collections
      };
    case ACTION_TYPE.TOGGLE_COLLECTION: {
      const collection = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...collection,
          isCollapsed: !collection.isCollapsed
        }
      };
    }
    case ACTION_TYPE.EDIT_COLLECTION:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          name: action.name
        }
      };
    case ACTION_TYPE.REMOVE_COLLECTION: {
      const collections = { ...state };
      delete collections[action.id];
      return { ...collections };
    }
    case ACTION_TYPE.REMOVE_BOOKMARK_FROM_COLLECTION: {
      const collection = { ...state[action.collectionId] };
      console.log(state);
      console.log(action.collectionId);
      const relatedIdIndex = collection.bookmarksIds.indexOf(action.bookmarkId);
      collection.bookmarksIds.splice(relatedIdIndex, 1);

      return {
        ...state,
        [collection.id]: collection,
      };
    }
    default:
      return state;
  }
};

