import { ForbiddenException, Injectable, Logger, Scope } from '@nestjs/common';
import { MethodService, ExecMessage, AllowedMethods } from 'nest-invoke';
import { Methods, Providers } from './worker.module';

@Injectable({ scope: Scope.DEFAULT })
export class DeferredExecutorService {
  private readonly logger = new Logger(DeferredExecutorService.name);
  private readonly allowedTokens = new Set<string>(['UserRepository']);
  private readonly allowedMethods = new Set<AllowedMethods>(['update']);

  constructor(private methodService: MethodService) {}

  async execute(msg: ExecMessage) {
    const { providerToken, method, args } = msg;
    if (!this.allowedTokens.has(providerToken))
      throw new ForbiddenException(`Token "${providerToken}" is not allowed.`);
    if (!this.allowedMethods.has(method))
      throw new ForbiddenException(`Method "${method}" is not allowed.`);

    this.methodService.invoke<Providers, Methods>(providerToken, method, args);
  }
}
