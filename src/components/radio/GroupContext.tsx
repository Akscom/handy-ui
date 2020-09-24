import { createContext } from 'react';
// import { IRadioEvent } from './AbstractRadio';

export interface IRadioContext{
  value: any | undefined;
  isValueEqual(a: any | undefined, b: any | undefined): boolean;
  disabled: boolean;
  readOnly: boolean;
  direction: string;
  type: string;
  onRadioChange: ((e: any) => void) | null | undefined;
}

const context = createContext<IRadioContext | null>(null);

context.displayName = 'RadioGroupContext';

export default context;
