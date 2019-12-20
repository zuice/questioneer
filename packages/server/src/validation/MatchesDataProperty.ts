import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { compare } from 'bcryptjs';

export function MatchesDataProperty(
  Entity: any,
  comparator: string,
  password?: boolean,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'matchesDataProperty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const entity = await Entity.findOne({
            where: { [comparator]: (args.object as any)[comparator] },
          });

          if (!entity) {
            return false;
          }

          if (password) {
            const compared = await compare(value, entity[propertyName]);

            return compared;
          }

          if (value === entity[propertyName]) {
            return true;
          }

          return false;
        },
      },
    });
  };
}
