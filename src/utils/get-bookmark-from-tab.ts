import { Bookmark } from "../models/bookmark";
type Tab = chrome.tabs.Tab;

export const getBookmarkFromTab = (tab: Tab, id: string): Bookmark => ({
  id: id,
  name: tab.title,
  description: tab.title,
  url: tab.url,
  iconUrl: tab.favIconUrl
});
