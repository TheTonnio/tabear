import { Bookmarks } from "./bookmarks";
import { Collections } from "./collections";

export interface AppData {
  bookmarks: Bookmarks
  filteredBookmarks: Bookmarks
  collections: Collections
  collectionsOrder: string[]
}
