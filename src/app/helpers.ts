/// <reference path="../../typings/index.d.ts" />

export interface IStorageItem {
  key: string;
  value: any;
}

export class StorageItem {
  key: string;
  value: any;

  constructor(data: IStorageItem) {
    this.key = data.key;
    this.value = data.value;
  }
}

export class Utils {
  public static localStorageSupported =
  typeof window['localStorage'] !== "undefined" && window['localStorage'] !== null;

  // add value to storage
  public static add(key: string, item: string) {
    if (Utils.localStorageSupported) {
      localStorage.setItem(key, item);
    }
  }

  // get all values from storage (all items)
  public static getAllItems(): Array<StorageItem> {
    var list = new Array<StorageItem>();

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);

      list.push(new StorageItem({
        key: key,
        value: value
      }));
    }

    return list;
  }

  // get only all values from localStorage
  public static getAllValues(): Array<any> {
    var list = new Array<any>();

    if (Utils.localStorageSupported) {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);

        list.push(value);
      }
    }

    return list;
  }

  // get one item by key from storage
  public static get(key: string): string {
    if (Utils.localStorageSupported) {
      var item = localStorage.getItem(key);

      return item;
    } else {
      return null;
    }
  }

  // remove value from storage
  public static remove(key: string) {
    if (Utils.localStorageSupported) {
      localStorage.removeItem(key);
    }
  }

  // clear storage (remove all items from it)
  public static clear() {
    if (Utils.localStorageSupported) {
      localStorage.clear();
    }
  }

  public static getReferenceById(type: string, ref_id: number, references: Array<any>): any {
    var matchedReference = $.grep(references, function (reference) {
      return reference.type === type && reference.id == ref_id;
    });

    return matchedReference.length > 0 ? matchedReference[0] : {};
  }

  public static priceToUSDString(price: number): string {
    return '$' + price.toFixed(2);
  }

  public static tryParseNumber(str = '', radix = 10, defaultValue = 0): number {
    var retValue = defaultValue;
    if (str !== null) {
      if (typeof str === 'String' && str.length > 0) {
        retValue = parseInt(str, radix);
        if (isNaN(retValue)) {
          retValue = defaultValue;
        }
      }
    }
    return retValue;
  }

}