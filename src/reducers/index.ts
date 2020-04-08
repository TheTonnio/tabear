import { collectionsReducer } from "./collections";
import { bookmarksReducer } from "./bookmarks";
import { combineReducers } from "../utils/combine-reducers";
import { collectionsOrderReducer } from "./collections-order";

export const rootReducer = combineReducers({
  collections: collectionsReducer,
  bookmarks: bookmarksReducer,
  collectionsOrder: collectionsOrderReducer,
});
