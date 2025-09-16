import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

type AllowedMethods = 'update' | 'delete' | 'create';
type ExecMessage = {
  providerToken: string; // e.g. "UserRepository"
  method: AllowedMethods; // method name to call
  args: any[]; // forwarded to the method
  id: string; // optional message id
  metadata?: any; // optional metadata
};

@Injectable({ scope: Scope.DEFAULT })
export class DeferredExecutorService {
  private readonly logger = new Logger(DeferredExecutorService.name);
  private readonly allowedTokens = new Set<string>(['UserRepository']);
  private readonly allowedMethods = new Set<AllowedMethods>([
    'update',
    'create',
    'delete',
  ]);

  constructor(private readonly moduleRef: ModuleRef) {}

  async execute(msg: ExecMessage) {
    //todo: add interceptor for logging
    const { providerToken, method, args } = msg;
    if (!this.allowedTokens.has(providerToken))
      throw new ForbiddenException(`Token "${providerToken}" is not allowed.`);
    if (!this.allowedMethods.has(method))
      throw new ForbiddenException(`Method "${method}" is not allowed.`);

    const provider = await this.moduleRef.resolve<any>(
      providerToken,
      ContextIdFactory.create(),
      { strict: false }, //allows resolution from other modules in the graph
    );
    console.log(provider, '<');
    if (!provider || typeof provider[method] !== 'function') {
      throw new BadRequestException(
        `Provider "${providerToken}" does not implement "${method}()".`,
      );
    }

    this.logger.debug(
      `Executing ${providerToken}.${method} with args: ${JSON.stringify(args)}`,
    );
    return provider[method](...args);
  }
}
