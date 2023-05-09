import { injectable } from 'inversify';
import ValidatorInterface from './ValidatorInterface';

@injectable()
export default class Validator implements ValidatorInterface {
  public validate = (data: any, schema: any) => {
    const validationsOptions = { abortEarly: false, allowUnknown: true };
    const { error } = schema.validate(data, validationsOptions);
    return error;
  };
}
