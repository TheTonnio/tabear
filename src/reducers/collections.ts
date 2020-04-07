import { ACTION_TYPE } from "../constants/action-types";
import { Collection } from "../models/collection";

export const collectionsReducer = (state: { collections: any }, action: any) => {
  switch(action.type) {
    case ACTION_TYPE.UPDATE_COLLECTION:
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.collection.id]: action.collection
        }
      };
    case ACTION_TYPE.SET_COLLECTIONS:
      return {
        ...state,
        collections: {
          ...action.collections
        }
      };
    default:
      return state;
  }
};

