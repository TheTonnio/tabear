import { Bookmarks } from "./bookmarks";
import { Collections } from "./collections";

export interface AppData {
  bookmarks: Bookmarks
  collections: Collections
  collectionsOrder: string[]
}
