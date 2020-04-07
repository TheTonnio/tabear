import { ACTION_TYPE } from "../constants/action-types";
import {Collections} from "../models/collections";

export const setCollectionsOrder = (collectionsOrder: string[]) => ({
  type: ACTION_TYPE.SET_COLLECTIONS_ORDER,
  collectionsOrder
});
