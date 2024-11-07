import { JSONValue } from '../types/jsonDataTypes';

export const checkIsSimpleType = (value: JSONValue) => {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null);
}