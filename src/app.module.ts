import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';
import { AccountService } from './account.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb://${config.get('DB_HOST')}:${config.get('DB_PORT')}`,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'REDIS_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: config.get('REDIS_HOST'),
            port: config.get('REDIS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AppModule {}
