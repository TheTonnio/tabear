export interface ActionMenuConfigItem {
  action: (...args: any) => any
  icon: JSX.Element
  text: string
  iconColor?: string
}

export type ActionMenuConfig = ActionMenuConfigItem[];
