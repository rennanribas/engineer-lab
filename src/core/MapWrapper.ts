export interface MapVisualizationData<K, V> {
  entries: Array<[K, V]>;
  size: number;
  insertionOrder: K[];
}

export class MapWrapper<K, V> {
  private map: Map<K, V>;
  private _insertionOrder: K[] = [];

  constructor() {
    this.map = new Map<K, V>();
  }

  set(key: K, value: V): void {
    if (!this.map.has(key)) {
      this._insertionOrder.push(key);
    }
    this.map.set(key, value);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  delete(key: K): boolean {
    const result = this.map.delete(key);
    if (result) {
      const index = this._insertionOrder.indexOf(key);
      if (index !== -1) {
        this._insertionOrder.splice(index, 1);
      }
    }
    return result;
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  clear(): void {
    this.map.clear();
    this._insertionOrder = [];
  }

  get size(): number {
    return this.map.size;
  }

  entries(): Array<[K, V]> {
    return Array.from(this.map.entries());
  }

  keys(): K[] {
    return Array.from(this.map.keys());
  }

  values(): V[] {
    return Array.from(this.map.values());
  }

  get insertionOrder(): K[] {
    return [...this._insertionOrder];
  }

  getVisualizationData(): MapVisualizationData<K, V> {
    return {
      entries: this.entries(),
      size: this.size,
      insertionOrder: this.insertionOrder
    };
  }

  forEach(callback: (value: V, key: K, map: Map<K, V>) => void): void {
    this.map.forEach(callback);
  }
}