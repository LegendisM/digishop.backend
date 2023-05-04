import { Injectable } from "@nestjs/common";
import { IUser } from "../user/interface/user.interface";
import { GetUserDto } from "../user/dto/get-user.dto";
import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";
import { PolicyAction, PolicySubjects } from "./interface/policy.interface";
import { Role } from "../user/interface/role.interface";

@Injectable()
export class PolicyFactory {
    userAbility(user: IUser | GetUserDto) {
        const { can, build } = new AbilityBuilder<PureAbility<[PolicyAction, PolicySubjects]>>(
            createMongoAbility
        );

        can(PolicyAction.Read, 'Product');
        can(PolicyAction.Read, 'Support', { owner: user.id });

        if (user.roles.includes(Role.MODERATOR)) {
            can(PolicyAction.Create, 'Product');
            can([PolicyAction.Update, PolicyAction.Delete], 'Product', { owner: user.id });
        }

        if (user.roles.includes(Role.ADMIN)) {
            can(PolicyAction.Manage, 'all');
        }

        return build();
    }
}