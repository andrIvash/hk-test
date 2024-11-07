import {
    SampleData,
    FlattenedEntry,
    JSONValue,
    Field,
    FlattenedEntryType,
    KeyValueType
} from '../types/jsonDataTypes';
import { determineEntryType } from './determineEntryType';

export const flattenJSON = (
    data: SampleData | Field | Record<string, JSONValue>,
    parentKey: string = '',
    level: number = 0,
    flattenedResult: FlattenedEntry[] = [],
    flattenedLinksList: Record<string, KeyValueType> = {},
): {flattenedResult: FlattenedEntry[], flattenedLinksList: Record<string, KeyValueType>} => {
    const dataType = determineEntryType(data)
    if (dataType ===  FlattenedEntryType.primitive) {
        flattenedResult.push({ key: parentKey, value: data, type: dataType, level, parent: parentKey });
        flattenedLinksList[parentKey] = { data };
    } else {
        for (const key in data as SampleData) {
            const value = (data as Record<string, JSONValue>)[key];
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            const type = determineEntryType(value);
            flattenedResult.push({ key: fullKey, value, type, level, parent: parentKey });
            flattenedLinksList[fullKey] = { data: value };

            if (type === FlattenedEntryType.object) {
                flattenJSON(
                    value as SampleData,
                    fullKey,
                    level + 1,
                    flattenedResult,
                    flattenedLinksList,
                );
            } else if (type === FlattenedEntryType.array) {
                (value as Field[]).forEach((item, idx) => {
                    flattenJSON(
                        item as Field,
                        `${fullKey}[${idx}]`,
                        level + 1,
                        flattenedResult,
                        flattenedLinksList,
                    );
                });
            }
        }
    }
    return {
        flattenedResult,
        flattenedLinksList
    };
}