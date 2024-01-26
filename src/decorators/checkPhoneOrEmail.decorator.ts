import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'isEmailOrPhoneNumber', async: false })
export class IsEmailOrPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, _args: ValidationArguments) {
    const isEmail = /\S+@\S+\.\S+/
    const isPhoneNumber = /^\d{10}$/

    return isEmail.test(value) || isPhoneNumber.test(value)
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Invalid email or phone number'
  }
}

export function IsEmailOrPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailOrPhoneNumberConstraint
    })
  }
}
