import { ModuleRef } from '@nestjs/core';
type AllowedMethods = 'update' | 'delete' | 'create';
type ExecMessage = {
    providerToken: string;
    method: AllowedMethods;
    args: any[];
    id: string;
    metadata?: any;
};
export declare class DeferredExecutorService {
    private readonly moduleRef;
    private readonly logger;
    private readonly allowedTokens;
    private readonly allowedMethods;
    constructor(moduleRef: ModuleRef);
    execute(msg: ExecMessage): Promise<any>;
}
export {};
