import { LayoutType } from "./models/layout-type";

export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';

export const DraggableItemTypes = {
  BOOKMARK: 'BOOKMARK',
};

export const LAYOUT_TYPES_CODES: { [key: string]: LayoutType } = {
  Grid: 'grid',
  List: 'list'
};

export const MIN_CARD_WIDTH = 230;
export const LIST_GAP = 20;
