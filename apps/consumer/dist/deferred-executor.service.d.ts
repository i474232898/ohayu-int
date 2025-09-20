import { MethodService, ExecMessage } from 'nest-invoke';
export declare class DeferredExecutorService {
    private methodService;
    private readonly logger;
    private readonly allowedTokens;
    private readonly allowedMethods;
    constructor(methodService: MethodService);
    execute(msg: ExecMessage): Promise<void>;
}
