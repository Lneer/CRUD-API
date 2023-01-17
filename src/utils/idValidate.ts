import { validate as uuidValidate } from 'uuid';

export const idValidate = (id: string): boolean => uuidValidate(id);
