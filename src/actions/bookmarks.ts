import { ACTION_TYPE } from "../constants/action-types";

export const deleteBookmark = (id: string, collectionId: string) => ({
  type: ACTION_TYPE.REMOVE_BOOKMARK,
  id,
  collectionId,
});
