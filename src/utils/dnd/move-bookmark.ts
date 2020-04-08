import {addBookmark} from "../../actions/bookmarks";
import {getBookmarkFromTab} from "../get-bookmark-from-tab";
import {DnDSource} from "../../models/dnd-source";
import {DnDDestination} from "../../models/dnd-destination";
import {Collections} from "../../models/collections";
import {Bookmark} from "../../models/bookmark";

export const moveBookmark = (
  collections: Collections = { },
  source: DnDSource,
  destination: DnDDestination,
  draggableId: string,
  onMoveCB: (collections: Collections) => void,
  onCreateBookmarkCB: (bookmark: Bookmark) => void,
): void => {
  if (!destination) {
    return
  }

  if (
    destination.id === source.id &&
    destination.index === source.index
  ) {
    return
  }

  const start = collections[source.id as string];
  const finish = collections[destination.id as string];

  if (start === finish) {
    const newBookmarkIds = Array.from(start.bookmarksIds);
    newBookmarkIds.splice(source.index as number, 1);
    newBookmarkIds.splice(destination.index, 0, draggableId);

    const newCollection = {
      ...start,
      bookmarksIds: newBookmarkIds
    };

    onMoveCB({
      ...collections,
      [newCollection.id]: newCollection
    });

    return;
  }

  // If new tab dropped in a collection
  if (!start) {
    const finishBookmarkIds = Array.from(finish.bookmarksIds);
    onCreateBookmarkCB(getBookmarkFromTab(source.overload, draggableId));
    finishBookmarkIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      bookmarksIds: finishBookmarkIds
    };

    onMoveCB({
      ...collections,
      [newFinish.id]: newFinish
    });

    return;
  }

  const startBookmarkIds = Array.from(start.bookmarksIds);
  startBookmarkIds.splice(source.index as number, 1);
  const newStart = {
    ...start,
    bookmarksIds: startBookmarkIds
  };

  const finishBookmarkIds = Array.from(finish.bookmarksIds);
  finishBookmarkIds.splice(destination.index, 0, draggableId);

  const newFinish = {
    ...finish,
    bookmarksIds: finishBookmarkIds
  };

  onMoveCB({
    ...collections,
    [newStart.id]: newStart,
    [newFinish.id]: newFinish
  });
};
