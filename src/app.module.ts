import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AccountController],
  providers: [],
})
export class AppModule {}
