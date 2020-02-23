export default class Storage {
  storageDataKey: string = 'tobear.bmdata';

  public saveData(key: string, value: any) {
    localStorage.setItem(`${this.storageDataKey}.${key}`, JSON.stringify(value));
  }

  public getData(key: string): Promise<any> {
    return new Promise((resolve) => {
      const storageKey = `${this.storageDataKey}.${key}`;
      return resolve(JSON.parse(localStorage.getItem(storageKey) as string));
    });
  }

  public getDataObject(keys: string[]): Promise<any> {
    return new Promise((resolve) => {
      const res: any = keys.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: JSON.parse(localStorage.getItem(`${this.storageDataKey}.${curr}`) as string),
        }), {},
      );
      return resolve(res);
    });
  }
}
