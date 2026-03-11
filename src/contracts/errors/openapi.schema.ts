import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { MedicoreErrorCode } from './error.contract';

export const MEDICORE_ERROR_SCHEMA: SchemaObject = {
  type: 'object',
  required: ['error'],
  properties: {
    error: {
      type: 'object',
      required: ['code'],
      properties: {
        code: { type: 'string' },
        message: { type: 'string', nullable: true },
        details: {},
        requestId: { type: 'string', nullable: true },
        service: { type: 'string', nullable: true },
      },
    },
  },
};

export const MEDICORE_VALIDATION_ERROR_SCHEMA: SchemaObject = {
  type: 'object',
  required: ['error'],
  properties: {
    error: {
      type: 'object',
      required: ['code', 'details'],
      properties: {
        code: { type: 'string', enum: [MedicoreErrorCode.VALIDATION_ERROR] },
        message: { type: 'string', nullable: true },
        requestId: { type: 'string', nullable: true },
        service: { type: 'string', nullable: true },
        details: {
          type: 'array',
          items: {
            type: 'object',
            required: ['field', 'validationErrorCode'],
            properties: {
              field: { type: 'string' },
              validationErrorCode: { type: 'string' },
              message: { type: 'string', nullable: true },
            },
          },
        },
      },
    },
  },
};

