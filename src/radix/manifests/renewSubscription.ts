export const renewSubscription = (
  accountAddress: string,
  subscriptionId: string,
  xrdAmount: number,
  months: number,
) => `
CALL_METHOD
    Address("${accountAddress}")
    "withdraw"
    Address("${import.meta.env.VITE_XRD_ARRESS}")
    Decimal("${xrdAmount}")
;
TAKE_FROM_WORKTOP
    Address("${import.meta.env.VITE_XRD_ARRESS}")
    Decimal("${xrdAmount}")
    Bucket("bucket")
;
CALL_METHOD
    Address("${import.meta.env.VITE_ORACLE_SUBSCRIPTION_COMPONENT_ADDRESS}")
    "renew_subscription"
    NonFungibleLocalId("${subscriptionId}")
    ${months}u64
    Bucket("bucket")
;
CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
;`;


/**
 * CALL_METHOD
    Address("account_rdx128qrk4janwxsysky99anvft7x6auxh7jlf464rtr03ejqktez3jew7")
    "withdraw"
    Address("resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd")
    Decimal("1")
;
TAKE_FROM_WORKTOP
    Address("resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd")
    Decimal("1")
    Bucket("bucket")
;
CALL_METHOD
    Address("component_rdx1cqeam5fe0jmy2x0hfanzcherd8tvfg5pqwfa8sjzw7azuk0d3vwygl")
    "renew_subscription"
    NonFungibleLocalId("{461428c7cf4f0535-99ab5760fb40df15-2d6064c6ffb9b761-005308885a20aa34}")
    1u64
    Bucket("bucket")
;
CALL_METHOD
    Address("account_rdx128qrk4janwxsysky99anvft7x6auxh7jlf464rtr03ejqktez3jew7")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
;
 */

/**`
CALL_METHOD
    Address("${accountAddress}")
    "create_proof_of_non_fungibles"
    Address("${import.meta.env.VITE_ORACLE_SUBSCRIPTION_RESOURCE_ADDRESS}")
    Array<NonFungibleLocalId>(
        NonFungibleLocalId("${subscriptionId}")
    )
;
CREATE_PROOF_FROM_AUTH_ZONE_OF_NON_FUNGIBLES
    Address("${import.meta.env.VITE_ORACLE_SUBSCRIPTION_RESOURCE_ADDRESS}")
    Array<NonFungibleLocalId>(
        NonFungibleLocalId("${subscriptionId}")
    )
    Proof("proof")
;

CALL_METHOD
    Address("${accountAddress}")
    "withdraw"
    Address("${import.meta.env.VITE_XRD_ARRESS}")
    Decimal("${xrdAmount}")
;
TAKE_FROM_WORKTOP
    Address("${import.meta.env.VITE_XRD_ARRESS}")
    Decimal("${xrdAmount}")
    Bucket("bucket")
;
CALL_METHOD
    Address("${import.meta.env.VITE_ORACLE_SUBSCRIPTION_COMPONENT_ADDRESS}")
    "renew_subscription"
    Proof("proof")
    ${months}u64
    Bucket("bucket")
;
CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
;`; */