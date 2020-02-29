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

export const LIST_GAP = 20;
export const CONTAINER_MARGIN = 30;
export const WRAPPER_MARGIN = 21;
export const CARD_WIDTH = 230;
export const CARD_HEIGHT = 130;
export const CARD_GAP = 20;
export const COLLECTION_TOP_MARGIN = 25;
export const COLLECTION_BOTTOM_MARGIN = 15;

export const REGEXP_INTERNAL_CHROME_PATH = /(chrome:)|(chrome-extension:)/;
