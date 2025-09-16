import { Inject, Injectable, Logger } from '@nestjs/common';
import { ExecMessage } from './types';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class MethodService {
  private readonly logger = new Logger(MethodService.name);

  constructor(
    @Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy,
    private readonly moduleRef: ModuleRef
  ) {}

  sendMessage(msg: ExecMessage) {
    const id = uuidv4();
    this.logger.log(
      `Sending message to queue: ${JSON.stringify(msg)} with id: ${id}`
    );
    this.rabbitClient.emit('order-placed', { id, ...msg });
  }

  async invoke<
    TProvider extends object,
    TMethod extends keyof TProvider & string,
  >(
    providerToken: string,
    method: string,
    args: unknown[] = []
  ): Promise<
    Awaited<ReturnType<Extract<TProvider[TMethod], (...a: any[]) => any>>>
  > {
    this.logger.log(
      `Invoking ${providerToken}.${method} with args: ${JSON.stringify(args)}`
    );
    const provider = await this.moduleRef.resolve<TProvider>(
      providerToken,
      ContextIdFactory.create(),
      { strict: false }
    );
    if (!provider)
      throw new Error(
        `Provider "${String(providerToken)}" could not be resolved`
      );
    this.logger.log(`Provider resolved: ${provider.constructor.name}`);

    const fn = this.getMethod(provider, method, providerToken);
    const result = fn.apply(provider, args);

    return result;
  }

  private getMethod(
    provider: any,
    method: string,
    providerToken: string
  ): (...args: any[]) => any {
    const fn = (provider as any)[method];
    if (typeof fn !== 'function') {
      const available = Object.getOwnPropertyNames(
        Object.getPrototypeOf(provider)
      ).join(', ');
      throw new Error(
        `Method "${method}" not found on provider "${String(providerToken)}". ` +
          `Available: [${available}]`
      );
    }

    return fn;
  }
}
