import { InferSubjects } from "@casl/ability";
import { Product } from "src/modules/product/schema/product.schema";
import { Support } from "src/modules/support/schema/support.schema";
import { User } from "src/modules/user/decorator/user.decorator";

export type PolicySubjects = InferSubjects<typeof User | typeof Product | typeof Support> | 'User' | 'Product' | 'Support' | 'all';

export enum PolicyAction {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}