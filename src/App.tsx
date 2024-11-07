import React, { useEffect, useMemo, useState } from 'react';
import { DATA_PREFIX } from './constants';
import { IData } from './types/jsonDataTypes';
import { getData } from './service/getData';
import { flattenJSON } from './utils/flattenJSON';
import { checkIsSimpleType } from './utils/checkIfSiimpleType';
import { RenderJson } from './components/RenderJson';
import { Input } from './components/Input';
import './App.css';

function App() {
    const [data, setData] = useState<IData>({ rawData: [], flattenData: [], keyValueData: {} })
    const [activeKey, setActiveKey] = useState<string>('');

    useEffect(() => {
        getData().then((res) => {
            if (res) {
                const flattenData = flattenJSON(res);
                setData({
                    rawData: res,
                    flattenData: flattenData.flattenedResult,
                    keyValueData: flattenData.flattenedLinksList
                })
            }
        }).catch(() => {
            console.log('data error');
        })
    }, [])

    const onLinkClickHandler = (href: string) => {
        setActiveKey(href);
    }

    const onInputChangeHandler = (value: string) => {
        setActiveKey(value);
    }

    const propertyValue = useMemo(() => {
        let result: string = "undefined";
        if (activeKey) {
            const regex = new RegExp("^" + DATA_PREFIX + "\\s*");
            const key = activeKey.replace(regex, "");
            if (data && data.keyValueData && data.keyValueData[key]) {
                if (checkIsSimpleType(data.keyValueData[key].data)) {
                    result = `${data.keyValueData[key].data}`;
                }
            }
        }
        return result;
    }, [data, activeKey]);

    return (
        <div className="app">
            <section className='jsonData'>
                <div className={`jsonData__item jsonData__inputBlock`}>
                    <span className='jsonData__propTitle'>Property: </span>
                    <Input
                        value={activeKey}
                        onChange={onInputChangeHandler}
                    />
                </div>
                <div className={`jsonData__item jsonData__valueBlock`}>
                    <span className='jsonData__propTitle'>Value:</span>{propertyValue}
                </div>
                <div className={`jsonData__item jsonData__viewBlock`}>
                    {data.keyValueData && Object.keys(data.keyValueData).length ? (
                        <RenderJson
                            json={data.rawData}
                            onClick={onLinkClickHandler}
                            dataPrefix={DATA_PREFIX}
                        />
                    ) : undefined}
                </div>
            </section>
        </div>
    );
}

export default App;
