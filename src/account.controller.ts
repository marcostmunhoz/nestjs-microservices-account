import { Controller, Inject } from '@nestjs/common';
import {
  ACCOUNT_SERVICE_NAME,
  GetAccountRequest,
  GetAccountResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
} from './account.pb';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'Register')
  async register(
    @Payload() request: RegisterRequest,
  ): Promise<RegisterResponse> {
    try {
      const account = await this.accountService.create(
        request.name,
        request.email,
      );

      return {
        status: 201,
        id: account._id.toString(),
        error: [],
      };
    } catch (error) {
      return {
        status: 500,
        id: '',
        error: [error.message],
      };
    }
  }

  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'GetAccount')
  async getAccount(
    @Payload() request: GetAccountRequest,
  ): Promise<GetAccountResponse> {
    try {
      const account = await this.accountService.find(request.id);

      return {
        status: 200,
        error: [],
        account,
      };
    } catch (error) {
      return {
        status: 500,
        error: [error.message],
        account: null,
      };
    }
  }

  @GrpcMethod(ACCOUNT_SERVICE_NAME, 'UpdateAccount')
  async updateAccount(
    @Payload() request: UpdateAccountRequest,
  ): Promise<UpdateAccountResponse> {
    try {
      await this.accountService.update(request.id, request.name, request.email);

      return {
        status: 200,
        error: [],
      };
    } catch (error) {
      return {
        status: 500,
        error: [error.message],
      };
    }
  }
}
