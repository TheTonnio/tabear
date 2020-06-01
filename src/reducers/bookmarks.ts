import { ACTION_TYPE } from "../constants/action-types";
import { Bookmarks } from "../models/bookmarks";

export const bookmarksReducer = (state: Bookmarks, action: any) => {
  switch(action.type) {
    case ACTION_TYPE.ADD_BOOKMARK:
      return {
        ...state,
        [action.bookmark.id]: action.bookmark
      };
    case ACTION_TYPE.REMOVE_BOOKMARK: {
      const bookmarks = { ...state };
      delete bookmarks[action.id];
      return { ...bookmarks };
    }
    case ACTION_TYPE.SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: {
          ...action.bookmarks
        }
      };
    case ACTION_TYPE.EDIT_BOOKMARK:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          name: action.name,
          description: action.description,
        }
      };
    case ACTION_TYPE.REMOVE_BOOKMARKS: {
      const bookmarks = { ...state };
      action.ids.forEach((id: string) => delete bookmarks[id]);
      return { ...bookmarks };
    }
    default:
      return state;
  }
}

