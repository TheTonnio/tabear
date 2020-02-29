type Tab = chrome.tabs.Tab;

export class TabsApi {
  static getActiveList(): Promise<Tab[]> {
    return new Promise((resolve, reject) => {
      try {
        return chrome.tabs.query(
          { currentWindow: true },
          (res) => resolve(res));
      } catch (e) {
        reject(e);
      }
    })
  }
}
