import { LAYOUT_TYPES_CODES } from "./index";
import { LayoutType } from "../models/layout-type";

export interface Config {
  maxItemsPerRow: number
  isPanelCollapsed: boolean
  layoutType: LayoutType
  setConfigValue: (fieldName: string, value: any) => void
}

export const defaultConfig: Config = {
  maxItemsPerRow: 0,
  isPanelCollapsed: false,
  layoutType: LAYOUT_TYPES_CODES.Grid,
  setConfigValue: () => {}
};
