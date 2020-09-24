import { createContext } from 'react';

export interface ICheckboxContext {
  value: any[];
  type: string,
  disabled: boolean;
  readOnly: boolean;
  isValueEqual: (value1: any, value2: any) => boolean;
  onChange: (e: any) => void;
}

export default createContext<ICheckboxContext| null>(null);
