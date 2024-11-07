export type Field = {
    id: string;
    prop: string;
    value: string;
    hasError: boolean;
} | string | number;

export type SampleData = {
    date: string;
    hasError: boolean;
    fields: Field[];
};
  
export type JSONValue = number | string | boolean | JSONValue[] | { [key: string]: JSONValue } | null

export enum FlattenedEntryType {
    primitive = "primitive",
    object = "object",
    array = "array",
}

export type FlattenedEntry = {
    key: string;
    value: JSONValue;
    type: FlattenedEntryType;
    level: number;
    parent?: string;
};

export type KeyValueType = {
   data: JSONValue
}
export interface IData {
    rawData: JSONValue,
    flattenData: FlattenedEntry[],
    keyValueData: Record<string, KeyValueType>
}