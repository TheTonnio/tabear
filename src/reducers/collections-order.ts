import { ACTION_TYPE } from "../constants/action-types";

export const collectionsOrderReducer = (state: string[], action: any) => {
  switch(action.type) {
    case ACTION_TYPE.SET_COLLECTIONS_ORDER:
      return {
        ...action.collectionsOrder
      };
    case ACTION_TYPE.REMOVE_COLLECTION_FROM_ORDER: {
      const collectionsOrder = [ ...state ];
      const relatedIdOrderIndex = collectionsOrder.indexOf(action.id);
      collectionsOrder.splice(relatedIdOrderIndex, 1);
      return [ ...collectionsOrder ];
    }
    case ACTION_TYPE.UPDATE_COLLECTIONS_ORDER: {
      const collectionOrder = [ ...state ];
      collectionOrder.splice(action.fromIndex, 1);
      collectionOrder.splice(action.toIndex, 0, action.id);
      return [ ...collectionOrder ];
    }
    default:
      return state;
  }
};

