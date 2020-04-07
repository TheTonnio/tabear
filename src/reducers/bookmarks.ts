import { ACTION_TYPE } from "../constants/action-types";

export const bookmarksReducer = (state: { bookmarks: any, collections: any }, action: { type: string, id: string, collectionId: string }) => {
  switch(action.type) {
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
    default:
      return state;
  }
};

