import { Bookmarks } from "../models/bookmarks";

export const searchBookmarksByQuery = (bookmarks: Bookmarks, query: string): Bookmarks => {
  const filteredBookmarks = { ...bookmarks };
  const formattedQuery = query.toLowerCase();
  const bookmarksObjKeys = Object.keys(bookmarks);

  bookmarksObjKeys.filter((key: string) => {
    const { name, description } = bookmarks[key];

    if (`${name}${description}`.toLocaleLowerCase().indexOf(formattedQuery) === -1) {
      delete filteredBookmarks[key];
    }
  });

  return filteredBookmarks;
};
