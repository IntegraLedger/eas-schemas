# @integraledger/eas-schemas

EAS (Ethereum Attestation Service) schema definitions for Integra V6 contracts.

## Installation

```bash
npm install @integraledger/eas-schemas
```

## Schemas

### 1. Access Capability Schema

Used by Layer 3 Resolvers for capability-based access control.

```typescript
import { ACCESS_CAPABILITY_SCHEMA, CAPABILITIES, combineCapabilities } from '@integraledger/eas-schemas';

// Schema definition
console.log(ACCESS_CAPABILITY_SCHEMA.schema);

// Grant claim + transfer capabilities
const caps = combineCapabilities(
  CAPABILITIES.CLAIM_TOKEN,
  CAPABILITIES.TRANSFER_TOKEN
);
```

### 2. Trust Credential Schema

Used by resolvers to issue trust credentials when documents complete.

```typescript
import { TRUST_CREDENTIAL_SCHEMA } from '@integraledger/eas-schemas';
```

### 3. Payment Payload Schema

Used by IntegraSignalV6 to attest to encrypted payment payload hash.

```typescript
import { PAYMENT_PAYLOAD_SCHEMA } from '@integraledger/eas-schemas';
```

## Capability Bitmask

```typescript
import { CAPABILITIES, hasCapability } from '@integraledger/eas-schemas';

const userCaps = 0x03; // CLAIM_TOKEN | TRANSFER_TOKEN

if (hasCapability(userCaps, CAPABILITIES.CLAIM_TOKEN)) {
  console.log("User can claim tokens");
}
```

## EAS Contract Addresses

```typescript
import { EAS_ADDRESSES } from '@integraledger/eas-schemas';

const polygonEAS = EAS_ADDRESSES.POLYGON.eas;
// 0x5E634ef5355f45A855d02D66eCD687b1502AF790
```

## Schema Registration

Before using these schemas, register them on EAS:

1. Visit: https://polygon.easscan.org/schema/create
2. Enter schema string from schema definition
3. Set revocable flag as specified
4. Copy resulting schema UID for use in contracts

## Usage in V6 Contracts

V6 Resolver contracts expect attestations following the Access Capability Schema:

```solidity
function claimToken(
    bytes32 integraHash,
    uint256 tokenId,
    bytes32 capabilityAttestationUID  // UID from EAS
) external
```

The attestation must grant `CAPABILITY_CLAIM_TOKEN` to the caller.

## License

MIT
