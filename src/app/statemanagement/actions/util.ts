// This is to ensure that Action types are unique in the application

import { Action } from '@ngrx/store';
const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}
