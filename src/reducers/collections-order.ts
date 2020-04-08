import { ACTION_TYPE } from "../constants/action-types";

export const collectionsOrderReducer = (state: { collectionsOrder: any }, action: any) => {
  switch(action.type) {
    case ACTION_TYPE.SET_COLLECTIONS_ORDER:
      return {
        ...state,
        collectionsOrder: {
          ...action.collectionsOrder
        }
      };
    case ACTION_TYPE.REMOVE_COLLECTION_FROM_ORDER:
      const updatedCollectionsOrder = [ ...state.collectionsOrder ];
      const relatedIdOrderIndex = updatedCollectionsOrder.indexOf(action.id);
      updatedCollectionsOrder.splice(relatedIdOrderIndex, 1);

      return {
        ...state,
        collectionsOrder: [ ...updatedCollectionsOrder ]
      };
    default:
      return state;
  }
};

