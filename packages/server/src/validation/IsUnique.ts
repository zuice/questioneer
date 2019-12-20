import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsUnique(Entity: any, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        async validate(value: any) {
          const exists = await Entity.findOne({
            where: { [propertyName]: value },
          });

          return !exists;
        },
      },
    });
  };
}
