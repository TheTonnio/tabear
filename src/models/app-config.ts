import { LayoutType } from "./layout-type";

export interface AppConfig {
  maxItemsPerRow: number
  isPanelCollapsed: boolean
  layoutType: LayoutType
  setConfigValue: (fieldName: string, value: any) => void
}
