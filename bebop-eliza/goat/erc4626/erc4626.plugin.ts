import { type Chain, PluginBase } from "@goat-sdk/core";
import type { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { Erc4626Service } from "./erc4626.service.js";
import type { Vault } from "./vault.js";

export type ERC4626PluginCtorParams = {
    //tokens: Token[];
    vaults: Vault[];
};

export class ERC4626Plugin extends PluginBase<EVMWalletClient> {
    constructor({ vaults }: ERC4626PluginCtorParams) {
        super("erc4626", [new Erc4626Service()]);
    }

    supportsChain = (chain: Chain) => chain.type === "evm";
}

export function erc4626({ vaults }: ERC4626PluginCtorParams) {
    return new ERC4626Plugin({ vaults });
}