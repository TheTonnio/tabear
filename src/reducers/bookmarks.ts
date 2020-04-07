import { ACTION_TYPE } from "../constants/action-types";

export const bookmarksReducer = (state: { bookmarks: any, collections: any }, action: any) => {
  switch(action.type) {
    case ACTION_TYPE.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: {
          ...state.bookmarks,
          [action.bookmarks.id]: action.bookmarks
        }
      };
    case ACTION_TYPE.REMOVE_BOOKMARK:
      const newBookmarksObj = { ...state.bookmarks };
      const newCollectionObj = { ...state.collections[action.collectionId] };
      const relatedIdIndex = newCollectionObj.bookmarksIds.indexOf(action.id);

      newCollectionObj.bookmarksIds.splice(relatedIdIndex, 1);
      delete newBookmarksObj[action.id];

      const newState = {
        ...state,
        bookmarks: newBookmarksObj,
        collections: {
          ...state.collections,
          [newCollectionObj.id]: newCollectionObj
        }
      };

      return {
        ...newState
      };
    case ACTION_TYPE.SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: {
          ...action.bookmarks
        }
      };
    default:
      return state;
  }
};

