import { describe, expect, it } from "vitest";
import { NonFungibleConditionCode, FungibleConditionCode, makeStandardNonFungiblePostCondition, makeStandardSTXPostCondition, createAssetInfo, bufferCVFromString } from '@stacks/transactions';

// Assuming `simnet` and `userSession` are available in the scope or imported
const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;

describe("Smart Contract Tests with Post-Conditions", () => {
  it("ensures simnet is well initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("creates post-conditions for NFT and STX transfers", () => {
    // Define the post-condition address from the user's session
    const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;

    // Define NFT post-condition parameters
    const nftPostConditionCode = NonFungibleConditionCode.Sends;
    const assetAddress = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5"; // Replace with actual asset contract address
    const assetContractName = "nft-trait";
    const assetName = "nft-trait";
    const tokenAssetName = bufferCVFromString("nft-trait");

    // Create asset information for NFT post-condition
    const nonFungibleAssetInfo = createAssetInfo(assetAddress, assetContractName, assetName);

    // Define STX post-condition parameters
    const stxConditionCode = FungibleConditionCode.LessEqual;
    const stxConditionAmount = 50000000; // Amount in microSTX (e.g., 0.5 STX)

    // Create an array of post-conditions
    const postConditions = [
      makeStandardNonFungiblePostCondition(
        postConditionAddress,
        nftPostConditionCode,
        nonFungibleAssetInfo,
        tokenAssetName
      ),
      makeStandardSTXPostCondition(
        postConditionAddress,
        stxConditionCode,
        stxConditionAmount
      )
    ];

    // Validate post-conditions array
    expect(postConditions).toBeDefined();
    expect(postConditions.length).toBe(2);
  });
});
