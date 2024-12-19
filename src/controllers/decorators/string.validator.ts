import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isString,
  maxLength,
  minLength,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsNonEmptyStringConstraint
  implements ValidatorConstraintInterface
{
  validate(value: unknown) {
    if (!isString(value)) {
      return false;
    }

    if (!minLength(value, 1)) {
      return false;
    }
    if (!maxLength(value, 255)) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { property, value } = args;
    if (value === undefined) {
      return `${property} is required.`;
    }
    return `${property} must be a string between 1 and 255 characters long`;
  }
}

export function IsNonEmptyString(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsNonEmptyString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNonEmptyStringConstraint,
    });
  };
}
