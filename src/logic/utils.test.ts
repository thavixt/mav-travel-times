import { describe, it, expect } from 'vitest';
import { sleep } from './utils';

describe('sleep', () => {
  it('should sleep for the specified amount of milliseconds', async () => {
    const start = Date.now();
    await sleep(500);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(500);
  });

  it('should sleep for a random time between 1-2 seconds', async () => {
    const start = Date.now();
    await sleep();
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
    expect(end - start).toBeLessThanOrEqual(2000);
  });
});