// libs/db/src/lib/db.spec.ts
import { prisma } from './prisma';

describe('db library', () => {
  it('should export a prisma client', () => {
    expect(prisma).toBeDefined();
  });
});
