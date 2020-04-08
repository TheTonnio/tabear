import { LAYOUT_TYPES_CODES } from "./index";
import { AppConfig } from "../models/app-config";



export const defaultConfig: AppConfig = {
  maxItemsPerRow: 0,
  isPanelCollapsed: false,
  layoutType: LAYOUT_TYPES_CODES.Grid,
  setConfigValue: () => {}
};
