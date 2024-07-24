import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PayloadTypes } from './types/types';

@Injectable()
export class JwtArtistsGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest<TUser = PayloadTypes>(err: any, user: any): TUser {
    console.log('err : ', err);
    console.log('user : ', user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user.artistId) {
      return user;
    }
    throw err || new UnauthorizedException();
  }
}
