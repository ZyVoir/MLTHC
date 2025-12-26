import { Type } from '@sinclair/typebox';

export const envSchema = {
  type: 'object',
  required: ['DATABASE_URL'],
  properties: {
    PORT: Type.Number(),
    DATABASE_URL: Type.String(),
    NODE_ENV: Type.String(),
    BASE_URL: Type.String(),
  },
};