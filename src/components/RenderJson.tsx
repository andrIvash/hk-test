import React from 'react';
import { JSONValue } from '../types/jsonDataTypes';
import { Link } from '../components/Link';
import { checkIsSimpleType } from '../utils/checkIfSiimpleType';

const LEVEL_IDENT = '20px';
const OPEN_BRACE_ARRAY = '[';
const OPEN_BRACE_OBJECT = '{';
const CLOSE_BRACE_ARRAY = ']';
const CLOSE_BRACE_OBJECT = '}';

export interface IProps {
    json: JSONValue,
    parentKey?: string,
    onClick?: (href: string) => void;
    dataPrefix?: string;
}

export const RenderJson = ({ json, parentKey, onClick, dataPrefix }: IProps) => {
    if (typeof json === 'object' && json !== null) {
        const isArray = Array.isArray(json);
        return (
            <span>
                {isArray ? OPEN_BRACE_ARRAY : OPEN_BRACE_OBJECT}
                <div style={{ marginLeft: LEVEL_IDENT }}>
                    {Object.entries(json).map(([key, value], index, array) => {
                        const fullKey = parentKey ?
                            isArray ? `${parentKey}[${index}]` : `${parentKey}.${key}` : key;
                        return (
                            <div key={fullKey}>
                                <span>
                                    {isArray ? '' :
                                        <>
                                            {checkIsSimpleType(value) ? (
                                                <Link
                                                    className='propLink'
                                                    href={fullKey}
                                                    onClick={onClick}
                                                    hrefPrefix={dataPrefix}
                                                >{key}</Link>
                                            ) : `${key}`}
                                            {': '}
                                        </>
                                    }
                                    <RenderJson
                                        json={value}
                                        parentKey={fullKey}
                                        onClick={onClick}
                                        dataPrefix={dataPrefix}
                                    />
                                    {index < array.length - 1 && ','}
                                </span>
                            </div>
                        )
                    })}
                </div>
                {isArray ? CLOSE_BRACE_ARRAY : CLOSE_BRACE_OBJECT}
            </span >
        );
    } else {
        return <span>{JSON.stringify(json)}</span>;
    };
};