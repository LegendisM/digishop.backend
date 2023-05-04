import { Global, Module } from "@nestjs/common";
import { PolicyFactory } from "./policy.factory";

@Global()
@Module({
    providers: [PolicyFactory],
    exports: [PolicyFactory]
})
export class PolicyModule { }