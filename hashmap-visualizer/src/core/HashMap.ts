export interface HashMapEntry<K, V> {
  key: K;
  value: V;
  hash: number;
}

export interface HashMapVisualizationData<K, V> {
  buckets: Array<HashMapEntry<K, V>[]>;
  size: number;
  capacity: number;
  loadFactor: number;
}

export class HashMap<K, V> {
  private buckets: Array<HashMapEntry<K, V>[]>;
  private _size: number = 0;
  private _capacity: number;
  private readonly maxLoadFactor: number = 0.75;

  constructor(initialCapacity: number = 16) {
    this._capacity = initialCapacity;
    this.buckets = new Array(this._capacity).fill(null).map(() => []);
  }

  private hash(key: K): number {
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % this._capacity;
  }

  set(key: K, value: V): void {
    const hashValue = this.hash(key);
    const bucket = this.buckets[hashValue];
    
    const existingIndex = bucket.findIndex(entry => entry.key === key);
    if (existingIndex !== -1) {
      bucket[existingIndex].value = value;
      return;
    }

    bucket.push({ key, value, hash: hashValue });
    this._size++;

    if (this._size > this._capacity * this.maxLoadFactor) {
      this.resize();
    }
  }

  get(key: K): V | undefined {
    const hashValue = this.hash(key);
    const bucket = this.buckets[hashValue];
    const entry = bucket.find(entry => entry.key === key);
    return entry?.value;
  }

  delete(key: K): boolean {
    const hashValue = this.hash(key);
    const bucket = this.buckets[hashValue];
    const index = bucket.findIndex(entry => entry.key === key);
    
    if (index !== -1) {
      bucket.splice(index, 1);
      this._size--;
      return true;
    }
    return false;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  clear(): void {
    this.buckets = new Array(this._capacity).fill(null).map(() => []);
    this._size = 0;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this._capacity *= 2;
    this.buckets = new Array(this._capacity).fill(null).map(() => []);
    this._size = 0;

    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }

  get size(): number {
    return this._size;
  }

  get capacity(): number {
    return this._capacity;
  }

  get loadFactor(): number {
    return this._size / this._capacity;
  }

  getVisualizationData(): HashMapVisualizationData<K, V> {
    return {
      buckets: this.buckets.map(bucket => [...bucket]),
      size: this._size,
      capacity: this._capacity,
      loadFactor: this.loadFactor
    };
  }

  entries(): Array<[K, V]> {
    const result: Array<[K, V]> = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        result.push([entry.key, entry.value]);
      }
    }
    return result;
  }
}