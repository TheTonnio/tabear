import { collectionsReducer } from "./collections";
import { bookmarksReducer } from "./bookmarks";
import { combineReducers } from "../utils/combine-reducers";
import { collectionsOrderReducer } from "./collections-order";
import { ACTION_TYPE_STORAGE_KEY_MAP } from "../constants/action-types";

export const rootReducer = combineReducers({
  collections: collectionsReducer,
  bookmarks: bookmarksReducer,
  collectionsOrder: collectionsOrderReducer,
});

export const getRootReducer = (storage: any) => {
  return (state: any, action: any) => {
    const newState = rootReducer(state, action);
    // @ts-ignore
    const key: string = ACTION_TYPE_STORAGE_KEY_MAP[action.type as string];
    storage.saveData(key, newState[key]);
    return newState;
  }
}
