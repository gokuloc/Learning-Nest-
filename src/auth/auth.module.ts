import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstant } from './auth.constants';
import { JWTStrategy } from './jwt.strategy';
import { ArtitsModule } from 'src/artists/artirts.module';
import { ApiKeyStrategy } from './api-key-strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConstant.secret,
      signOptions: { expiresIn: '1d' },
    }),
    ArtitsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
