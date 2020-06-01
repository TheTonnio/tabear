import { ACTION_TYPE } from "../constants/action-types";

export const setCollectionsOrder = (collectionsOrder: string[]) => ({
  type: ACTION_TYPE.SET_COLLECTIONS_ORDER,
  collectionsOrder
});

export const addNewCollectionToOrder = (id: string) => ({
  type: ACTION_TYPE.ADD_NEW_COLLECTION_TO_ORDER,
  id
});

export const removeCollectionFromOrder = (id: string) => ({
  type: ACTION_TYPE.REMOVE_COLLECTION_FROM_ORDER,
  id
});

export const updateCollectionsOrders = (id: string, fromIndex: number, toIndex: number) => ({
  type: ACTION_TYPE.UPDATE_COLLECTIONS_ORDER,
  id,
  fromIndex,
  toIndex,
});
