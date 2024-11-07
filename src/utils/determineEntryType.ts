import {
    JSONValue,
    FlattenedEntryType
} from '../types/jsonDataTypes';

export const determineEntryType = (value: JSONValue): FlattenedEntryType => {
    if (Array.isArray(value)) return FlattenedEntryType.array;
    if (typeof value === 'object' && value !== null) return FlattenedEntryType.object;
    return FlattenedEntryType.primitive;
};