import { ACTION_TYPE } from "../constants/action-types";
import { Collection } from "../models/collection";

export const collectionsOrderReducer = (state: { collectionsOrder: string[] }, action: any) => {
  switch(action.type) {
    case ACTION_TYPE.SET_COLLECTIONS_ORDER:
      return {
        ...state,
        collectionsOrder: [
          ...action.collectionsOrder
        ]
      };
    default:
      return state;
  }
};

