import { type Chain, PluginBase, createTool } from "@goat-sdk/core";
import type { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { z } from "zod";
import { ERC4626_ABI } from "./abi.js";
import type { Vault } from "./vault.js";

export type ERC4626PluginCtorParams = {
    vaults: Vault[];
};

export class ERC4626Plugin extends PluginBase<EVMWalletClient> {
    private vaults: Vault[];

    constructor({ vaults }: ERC4626PluginCtorParams) {
        super("erc4626", []);
        this.vaults = vaults;
    }

    supportsChain = (chain: Chain) => chain.type === "evm";

    getTools(walletClient: EVMWalletClient) {
        return [
            createTool(
                {
                    name: "deposit",
                    description: "Deposit an amount into the ERC4626 vault.",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                        assets: z.number().describe("The amount of tokens to deposit in base units"),
                        receiver: z.string().describe("The address of the receiver of the deposit"),
                    }),
                },
                async (parameters) => {
                    try {
                        const hash = await walletClient.sendTransaction({
                            to: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "deposit",
                            args: [parameters.assets, parameters.receiver],
                        });
                        return hash.hash;
                    } catch (error) {
                        throw new Error(`Failed to deposit into vault: ${error}`);
                    }
                }
            ),
            createTool(
                {
                    name: "withdraw",
                    description: "Withdraw an amount from the ERC4626 vault.",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                        assets: z.number().describe("The amount of tokens to withdraw in base units"),
                        receiver: z.string().describe("The address of the receiver of the deposit"),
                        owner: z.string().describe("The address of the owner of the deposit"),
                    }),
                },
                async (parameters) => {
                    try {
                        const hash = await walletClient.sendTransaction({
                            to: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "withdraw",
                            args: [parameters.assets, parameters.receiver, parameters.owner],
                        });
                        return hash.hash;
                    } catch (error) {
                        throw new Error(`Failed to withdraw from vault: ${error}`);
                    }
                }
            ),
            createTool(
                {
                    name: "getMaxWithdraw",
                    description: "Get the max withdrawal amount of an ERC4626 vault",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                        vaultAddress: z.string().describe("The address of the wallet"),
                    }),
                },
                async (parameters) => {
                    try {
                        const rawBalance = await walletClient.read({
                            address: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "maxWithdraw",
                            args: [parameters.vaultAddress],
                        });
                        return String(rawBalance.value);
                    } catch (error) {
                        throw Error(`Failed to fetch max withdraw: ${error}`);
                    }
                }
            ),
            createTool(
                {
                    name: "getOwner",
                    description: "Get the owner of an ERC4626 vault.",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                    }),
                },
                async (parameters) => {
                    try {
                        const rawBalance = await walletClient.read({
                            address: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "owner",
                            args: [],
                        });
                        return String(rawBalance.value);
                    } catch (error) {
                        throw Error(`Failed to fetch owner: ${error}`);
                    }
                }
            ),
            createTool(
                {
                    name: "getSymbol",
                    description: "Get the symbol of an ERC4626 vault.",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                    }),
                },
                async (parameters) => {
                    try {
                        const rawBalance = await walletClient.read({
                            address: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "symbol",
                            args: [],
                        });
                        return String(rawBalance.value);
                    } catch (error) {
                        throw Error(`Failed to fetch symbol: ${error}`);
                    }
                }
            ),
            createTool(
                {
                    name: "getName",
                    description: "Get the name of an ERC4626 vault.",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                    }),
                },
                async (parameters) => {
                    try {
                        const rawBalance = await walletClient.read({
                            address: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "name",
                            args: [],
                        });
                        return String(rawBalance.value);
                    } catch (error) {
                        throw Error(`Failed to fetch name: ${error}`);
                    }
                }
            ),
            createTool(
                {
                    name: "getUnderlyingToken",
                    description: "Get the underlying Token of an ERC4626 vault.",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                    }),
                },
                async (parameters) => {
                    try {
                        const rawBalance = await walletClient.read({
                            address: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "underlyingToken",
                            args: [],
                        });
                        return String(rawBalance.value);
                    } catch (error) {
                        throw Error(`Failed to fetch underlying token: ${error}`);
                    }
                }
            ),
            createTool(
                {
                    name: "getTotalAssets",
                    description: "Get the TotalAssets of an ERC4626 vault.",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                    }),
                },
                async (parameters) => {
                    try {
                        const rawBalance = await walletClient.read({
                            address: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "totalAssets",
                            args: [],
                        });
                        return String(rawBalance.value);
                    } catch (error) {
                        throw Error(`Failed to fetch total assets: ${error}`);
                    }
                }
            ),
            createTool(
                {
                    name: "getTotalSupply",
                    description: "Get the TotalSupply of an ERC4626 vault.",
                    parameters: z.object({
                        address: z.string().describe("The address of the vault"),
                    }),
                },
                async (parameters) => {
                    try {
                        const rawBalance = await walletClient.read({
                            address: parameters.address,
                            abi: ERC4626_ABI,
                            functionName: "totalSupply",
                            args: [],
                        });
                        return String(rawBalance.value);
                    } catch (error) {
                        throw Error(`Failed to fetch total supply: ${error}`);
                    }
                }
            ),
        ];
    }
}

export function erc4626({ vaults }: ERC4626PluginCtorParams) {
    return new ERC4626Plugin({ vaults });
}