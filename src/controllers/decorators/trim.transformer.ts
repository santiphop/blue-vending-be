import { Transform } from 'class-transformer';
import { isString } from 'class-validator';
import { trim } from 'lodash';

export function Trim() {
  return Transform(
    ({ value }: { value: unknown }): string | string[] | unknown => {
      // Perform validation
      if (typeof value === 'string') {
        return trim(value);
      }

      if (Array.isArray(value)) {
        return value.map((item) => (isString(item) ? trim(item) : item));
      }

      return value;
    },
  );
}
