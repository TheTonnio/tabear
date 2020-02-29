export default class Storage {
  storageDataKey: string = 'tobear.bmdata';

  public saveData(key: string, value: any) {
    chrome.storage.sync.set({ [`${this.storageDataKey}.${key}`]: value });
  }

  public getData(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const storageKey = `${this.storageDataKey}.${key}`;
        chrome.storage.sync.get([storageKey], (result) => resolve(result[storageKey]));
      } catch (e) {
        reject(e);
      }
    });
  }

  public getDataObject(keys: string[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const storageKeys = keys.map((k) => `${this.storageDataKey}.${k}`);
        chrome.storage.sync.get([...storageKeys], (result) => {
          const res: any = keys.reduce(
            (acc, curr) => ({
              ...acc,
              [curr]: result[`${this.storageDataKey}.${curr}`],
            }), {},
          );
          return resolve(res);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
