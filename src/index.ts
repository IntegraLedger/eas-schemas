/**
 * @integraledger/eas-schemas
 *
 * EAS (Ethereum Attestation Service) schema definitions for Integra V6 contracts.
 * These schemas must be registered on EAS SchemaRegistry before use.
 */

/**
 * Access Capability Schema
 *
 * Used by: Layer 3 Resolvers (MultiParty, Ownership, Shares)
 * Purpose: Grant capabilities to claim/transfer tokens
 *
 * Registration URL: https://polygon.easscan.org/schema/create
 */
export const ACCESS_CAPABILITY_SCHEMA = {
  name: "Integra Access Capability",
  description: "Grants capabilities for document token operations",
  schema: "bytes32 documentHash, uint256 tokenId, uint256 capabilities, string verifiedIdentity, string verificationMethod, uint256 verificationDate, string contractRole, string legalEntityType, string notes",
  revocable: true,
  resolver: "0x0000000000000000000000000000000000000000" // No resolver
};

/**
 * Trust Credential Schema
 *
 * Used by: Layer 3 Resolvers (trust graph)
 * Purpose: Issue trust credentials when documents complete
 *
 * Note: This is simplified. Full implementation would include:
 * - Counterparty commitments
 * - Poseidon hashing
 * - Privacy-preserving proofs
 */
export const TRUST_CREDENTIAL_SCHEMA = {
  name: "Integra Trust Credential",
  description: "Trust credential issued upon document completion",
  schema: "bytes32 credentialHash",
  revocable: false,
  resolver: "0x0000000000000000000000000000000000000000"
};

/**
 * Payment Payload Schema
 *
 * Used by: IntegraSignalV6
 * Purpose: Attest to payment payload hash
 *
 * The actual payment details are encrypted off-chain.
 * This attestation proves the payload hash is valid.
 */
export const PAYMENT_PAYLOAD_SCHEMA = {
  name: "Integra Payment Payload",
  description: "Attestation for encrypted payment payload hash",
  schema: "bytes32 payloadHash",
  revocable: false,
  resolver: "0x0000000000000000000000000000000000000000"
};

/**
 * All Integra EAS Schemas
 */
export const INTEGRA_SCHEMAS = {
  ACCESS_CAPABILITY: ACCESS_CAPABILITY_SCHEMA,
  TRUST_CREDENTIAL: TRUST_CREDENTIAL_SCHEMA,
  PAYMENT_PAYLOAD: PAYMENT_PAYLOAD_SCHEMA
} as const;

/**
 * Schema field types for encoding/decoding
 */
export interface AccessCapabilityData {
  documentHash: string;        // bytes32
  tokenId: number;             // uint256
  capabilities: number;        // uint256 (bitmask)
  verifiedIdentity: string;    // e.g., "john@example.com"
  verificationMethod: string;  // e.g., "email", "docusign", "video-call"
  verificationDate: number;    // uint256 (unix timestamp)
  contractRole: string;        // e.g., "Tenant", "Landlord", "Investor"
  legalEntityType: string;     // e.g., "Individual", "Corporation", "Trust"
  notes: string;               // Additional context
}

export interface TrustCredentialData {
  credentialHash: string;      // bytes32
}

export interface PaymentPayloadData {
  payloadHash: string;         // bytes32
}

/**
 * Capability Bitmask Constants
 * These match the constants in Capabilities.sol library
 */
export const CAPABILITIES = {
  CLAIM_TOKEN: 1 << 0,          // 0x01 - Can claim reserved tokens
  TRANSFER_TOKEN: 1 << 1,       // 0x02 - Can transfer tokens
  REQUEST_PAYMENT: 1 << 2,      // 0x04 - Can request payments
  APPROVE_PAYMENT: 1 << 3,      // 0x08 - Can approve payments
  UPDATE_METADATA: 1 << 4,      // 0x10 - Can update metadata
  DELEGATE_RIGHTS: 1 << 5,      // 0x20 - Can delegate to others
  REVOKE_ACCESS: 1 << 6,        // 0x40 - Can revoke others' access
  ADMIN: 1 << 7                 // 0x80 - Full admin rights
} as const;

/**
 * Helper to combine multiple capabilities
 */
export function combineCapabilities(...caps: number[]): number {
  return caps.reduce((acc, cap) => acc | cap, 0);
}

/**
 * Helper to check if capability is present
 */
export function hasCapability(capabilities: number, capability: number): boolean {
  return (capabilities & capability) === capability;
}

/**
 * EAS Contract Addresses (Polygon Mainnet)
 */
export const EAS_ADDRESSES = {
  POLYGON: {
    chainId: 137,
    eas: "0x5E634ef5355f45A855d02D66eCD687b1502AF790",
    schemaRegistry: "0x7876EEF51A891E737AF8ba5A5E0f0Fd29073D5a7",
    eip712Proxy: "0x4be71865917C7907ccA531270181D9B7dD4f2733",
    indexer: "0x12d0f50Eb2d67b14293bdDA2C248358f3dfE5308",
    explorer: "https://polygon.easscan.org"
  }
} as const;
