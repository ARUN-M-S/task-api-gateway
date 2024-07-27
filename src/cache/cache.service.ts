// src/cache/cache.service.ts
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async get<T>(key: string): Promise<T> {
    return this.cacheManager.get<T>(key);
  }

  async getAll(): Promise<any[]> {
    // cache-manager does not provide a direct way to list all keys, 
    // but we can keep track of keys manually if needed
    // Note: This requires additional logic to manage and retrieve keys
    throw new Error('Method not implemented. You may need to implement key tracking.');
  }

  async del(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }

  async resetCache(): Promise<void> {
    return await this.cacheManager.reset();
  }

  async cacheStore(): Promise<string[]> {
    return await this.cacheManager.store.keys();
  }
}
