import { Request } from '@hapi/hapi';

export interface AuthMiddlewareInterface {
  check(request: Request): Promise<Request>;
}
