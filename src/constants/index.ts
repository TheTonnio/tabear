import { LayoutType } from "../models/layout-type";

export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';

export const DraggableItemTypes = {
  BOOKMARK: 'BOOKMARK',
  TAB: 'TAB',
};

export const LAYOUT_TYPES_CODES: { [key: string]: LayoutType } = {
  Grid: 'grid',
  List: 'list'
};

export const DEFAULT_BUTTON_STYLE = "primary";

export const LIST_GAP = 20;
export const CONTAINER_MARGIN = 30;
export const WRAPPER_MARGIN = 20;
export const CARD_WIDTH = 230;
export const CARD_HEIGHT = 120;
export const CARDS_PLACEHOLDER_HEIGHT = 160;
export const CARD_ROW_GAP = 20;
export const COLLECTION_TOP_MARGIN = 20;
export const COLLECTION_BOTTOM_MARGIN = 20;

export const REGEXP_INTERNAL_CHROME_PATH = /(chrome:)|(chrome-extension:)/;
/* Colors */
export const azureRadiance = "#0075EB";
export const redOrange = "#FF491F";

export const defaultAccent = azureRadiance;
export const defaultRed = redOrange;
