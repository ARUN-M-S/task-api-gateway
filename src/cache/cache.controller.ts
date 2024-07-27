// src/cache/cache.controller.ts
import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post('set')
  async setCache(@Body() body: { key: string, value: any }) {
    await this.cacheService.set(body.key, body.value);
    return { success: true };
  }

  @Get('get/:key')
  async getCache(@Param('key') key: string) {
    const value = await this.cacheService.get(key);
    return { key, value };
  }

  @Delete('delete/:key')
  async deleteCache(@Param('key') key: string) {
    await this.cacheService.del(key);
    return { success: true };
  }

  // This method is a placeholder since cache-manager does not support listing all keys
  @Get('get-all')
  async getAllCache() {
    const values = await this.cacheService.getAll();
    return { values };
  }

  @Get('reset')
  async resetCache() {
    const values = await this.cacheService.resetCache();
    return { values };
  }

  @Get('store')
  async cacheStore() {
    const values = await this.cacheService.cacheStore();
    return { values };
  }
}
