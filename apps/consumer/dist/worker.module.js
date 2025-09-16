"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerModule = void 0;
const common_1 = require("@nestjs/common");
const deferred_executor_service_1 = require("./deferred-executor.service");
const rmq_controller_1 = require("./rmq.controller");
const user_repository_1 = require("./user.repository");
let WorkerModule = class WorkerModule {
};
exports.WorkerModule = WorkerModule;
exports.WorkerModule = WorkerModule = __decorate([
    (0, common_1.Module)({
        controllers: [rmq_controller_1.RmqController],
        providers: [
            deferred_executor_service_1.DeferredExecutorService,
            user_repository_1.UserRepository,
            { provide: 'UserRepository', useExisting: user_repository_1.UserRepository },
        ],
    })
], WorkerModule);
//# sourceMappingURL=worker.module.js.map