export const calcCollectionRowsNumber = (bookmarks = [], maxItemsPerRow: number) =>
  Math.ceil((bookmarks && bookmarks.length) / maxItemsPerRow);
