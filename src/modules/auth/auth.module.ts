import * as process from 'process';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@modules/user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from '@modules/auth/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.SECRET}`,
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
