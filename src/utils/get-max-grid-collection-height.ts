import { CARD_ROW_GAP, CARD_HEIGHT, COLLECTION_BOTTOM_MARGIN, COLLECTION_TOP_MARGIN } from "../constants";

export const getMaxGridCollectionHeight = (isCollectionCollapsed: boolean, rows: number) =>
  isCollectionCollapsed ? 0 : (CARD_HEIGHT + CARD_ROW_GAP) * rows - CARD_ROW_GAP + COLLECTION_TOP_MARGIN + COLLECTION_BOTTOM_MARGIN;
