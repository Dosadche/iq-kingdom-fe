import { Injectable } from '@angular/core';

export enum StorageKeys {
  User = 'user'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: StorageKeys): any {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch {
      return null;
    }
  }

  setItem(key: StorageKeys, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  removeItem(key: StorageKeys): void {
    localStorage.removeItem(key);
  }
}
