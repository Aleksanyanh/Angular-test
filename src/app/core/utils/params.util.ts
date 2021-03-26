import * as _ from 'lodash';

export function createParams(queryObj: any, nesting: string = ''): string {
  const pairs = Object.entries(queryObj).map(([key, val]) => {
    // Handle the nested, recursive case, where the value to createParams is an object itself

    if (val === null || val === undefined || (typeof val === 'string' && val.trim() === '')) {
      return null;
    }
    if (typeof val === 'object') {
      return createParams(val, nesting + `${key}.`);
    } else {
      // Handle base case, where the value to createParams is simply a string.

      return [nesting + key, val].map(_.escape).join('=');
    }
  });
  return pairs.filter(Boolean).join('&');
}
