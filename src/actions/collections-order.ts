import { ACTION_TYPE } from "../constants/action-types";
import {Collections} from "../models/collections";

export const setCollectionsOrder = (collectionsOrder: string[]) => ({
  type: ACTION_TYPE.SET_COLLECTIONS_ORDER,
  collectionsOrder
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
