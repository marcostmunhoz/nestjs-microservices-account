import { Inject, Injectable } from '@nestjs/common';
import { Account } from './account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientRedis } from '@nestjs/microservices';

export type AccountCreatedEvent = {
  accountId: string;
  email: string;
};

export type AccountUpdatedEvent = AccountCreatedEvent;

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private account: Model<Account>,
    @Inject('REDIS_SERVICE') private readonly redisClient: ClientRedis,
  ) {}

  async create(name: string, email: string): Promise<Account> {
    const account = new this.account({ name, email });
    account.save();

    this.redisClient.emit<any, AccountCreatedEvent>('account.created', {
      accountId: account.id,
      email,
    });

    console.log('Event emitted: account.created', {
      accountId: account.id,
      email,
    });

    return account;
  }

  async find(id: string): Promise<Account | null> {
    return this.account.findById(id);
  }

  async update(id: string, name: string, email: string): Promise<Account> {
    const account = this.account.findByIdAndUpdate(id, { name, email });

    this.redisClient.emit<any, AccountUpdatedEvent>('account.updated', {
      accountId: id,
      email,
    });

    console.log('Event emitted: account.updated', { accountId: id, email });

    return account;
  }
}
