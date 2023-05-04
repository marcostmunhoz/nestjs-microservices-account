import { Controller } from '@nestjs/common';
import {
  ACCOUNT_SERVICE_NAME,
  GetAccountResponse,
  RegisterResponse,
  UpdateAccountResponse,
} from './account.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AccountController {
  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'Register')
  async register(): Promise<RegisterResponse> {
    return {
      status: 201,
      error: [],
      id: '1',
    };
  }

  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'GetAccount')
  async getAccount(): Promise<GetAccountResponse> {
    return {
      status: 201,
      error: [],
      account: {
        name: 'User 1',
        email: 'user1@example.com',
      },
    };
  }

  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'UpdateAccount')
  async updateAccount(): Promise<UpdateAccountResponse> {
    return {
      status: 200,
      error: [],
    };
  }
}
