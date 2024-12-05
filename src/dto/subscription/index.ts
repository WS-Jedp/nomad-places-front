export enum SubscriptionTypeEnum {
    EXPLORER_PLAN = "EXPLORER_PLAN",
    WANDERLUST_PLAN = "WANDERLUST_PLAN",
    NOMAD_PLAN = "NOMAD_PLAN",
}

export enum SubscriptionStatusEnum {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    PENDING = "PENDING",
    CANCELLED = "CANCELLED",
}

export type Subscription = {
    type: SubscriptionTypeEnum,
    status: SubscriptionStatusEnum,
    createdDate: string,
    updatedDate: string,
}