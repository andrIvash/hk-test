import { SampleData } from '../types/jsonDataTypes';

const sampleData = {
    date: "2021-10-27T07:49:14.896Z",
    hasError: false,
    fields: [
        {
            id: "4c212130",
            prop: "iban",
            value: "DE81200505501265402568",
            hasError: false
        },
        {
            id: "4c212132",
            prop: "iban",
            value: "DE81200505501265402569",
            hasError: false
        },
    ],
    fields2: {
        item1: {
            id: "4c212130",
            prop: "iban",
            value: "DE81200505501265402568",
            hasError: false
        },
        item2: "text value"
    },
    item2: [
        {
            id: "4c212130",
            prop: "iban",
            value: "DE81200505501265402568",
            hasError: false
        },
    ]
};

export const getData = (): Promise<SampleData | null> => {
  return new Promise((res) =>  {
    setTimeout(() => {
      return res(sampleData);
    }, 1000)
  });
};