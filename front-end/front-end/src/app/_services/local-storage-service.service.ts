import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static clear() {
    throw new Error('Method not implemented.');
  }
  static setItem: any;
  static getItem(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private storage: Storage | null;

  constructor() {
    this.storage = typeof window !== 'undefined' ? window.localStorage : null;
  }

  getItem(key: string): string | null {
    return this.storage ? this.storage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, value);
    } else {
      // Handle the absence of localStorage, maybe fallback to other storage mechanisms
    }
  }

  removeItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }

  clear(): void {
    if (this.storage) {
      this.storage.clear();
    }
  }
}
