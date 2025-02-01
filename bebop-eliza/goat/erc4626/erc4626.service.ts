import { Tool } from "@goat-sdk/core";
import type { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { ERC4626_ABI } from "./abi.js";
import type {
    DepositVaultParameters,
    GetMaxSupplyParameters,
    GetPoolTotalSupplyParameters,
    WithdrawVaultParameters,
} from "./parameters.js";

export class Erc4626Service {


    @Tool({
        description: "Deposit an amount into the ERC4626 vault.",
    })
    async deposit(walletClient: EVMWalletClient, parameters: DepositVaultParameters): Promise<string> {
        try {
            const hash = await walletClient.sendTransaction({
                to: parameters.address, //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "deposit",
                args: [parameters.assets, parameters.receiver],
            });

            return hash.hash;
        } catch (error) {
            throw new Error(`Failed to deposit into vault: ${error}`);
        }
    }

    @Tool({
        //name: "kim_burn",
        description: "Withdraw an amount into the ERC4626 vault.",
    })
    async withdraw(walletClient: EVMWalletClient, parameters: WithdrawVaultParameters): Promise<string> {
        try {
            const hash = await walletClient.sendTransaction({
                to: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "withdraw",
                args: [parameters.assets, parameters.receiver, parameters.owner],
            });

            return hash.hash;
        } catch (error) {
            throw new Error(`Failed to withdraw from vault: ${error}`);
        }
    }


    @Tool({
        description: "Get the max withdrawal amount of an ERC4626 vault",
    })
    async getMaxWithdraw(walletClient: EVMWalletClient, parameters: GetMaxSupplyParameters) {
        try {
            //const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);

            const rawBalance = await walletClient.read({
                address: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", //parameters.address, //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "maxWithdraw",
                args: [parameters.address],
            });

            return String(rawBalance.value);
        } catch (error) {
            throw Error(`Failed to fetch max withdrawal: ${error}`);
        }
    }

    @Tool({
        description: "Get the owner of an ERC4626 vault.",
    })
    async getOwner(walletClient: EVMWalletClient, parameters: GetPoolTotalSupplyParameters) {
        try {
            //const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);

            const rawBalance = await walletClient.read({
                address: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "owner",
                args: [],
            });

            return String(rawBalance.value);
        } catch (error) {
            throw Error(`Failed to fetch balance: ${error}`);
        }
    }

    @Tool({
        description: "Get the symbol of an ERC4626 vault.",
    })
    async getSymbol(walletClient: EVMWalletClient, parameters: GetPoolTotalSupplyParameters) {
        try {
            //const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);
            console.log("parameters", parameters)
            console.log("parameters.address", parameters.address)

            const rawBalance = await walletClient.read({
                address: parameters.address, //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "symbol",
                args: [],
            });

            return String(rawBalance.value);
        } catch (error) {
            throw Error(`Failed to fetch balance: ${error}`);
        }
    }

    @Tool({
        description: "Get the name of an ERC4626 vault.",
    })
    async getName(walletClient: EVMWalletClient, parameters: GetPoolTotalSupplyParameters) {
        try {
            //const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);

            const rawBalance = await walletClient.read({
                address: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "name",
                args: [],
            });

            return String(rawBalance.value);
        } catch (error) {
            throw Error(`Failed to fetch balance: ${error}`);
        }
    }

    @Tool({
        description: "Get the underlying Token of an ERC4626 vault.",
    })
    async getUnderlyingToken(walletClient: EVMWalletClient, parameters: GetPoolTotalSupplyParameters) {
        try {
            //const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);

            const rawBalance = await walletClient.read({
                address: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "underlyingToken",
                args: [],
            });

            return String(rawBalance.value);
        } catch (error) {
            throw Error(`Failed to fetch balance: ${error}`);
        }
    }

    @Tool({
        description: "Get the TotalAssets of an ERC4626 vault.",
    })
    async getTotalAssets(walletClient: EVMWalletClient, parameters: GetPoolTotalSupplyParameters) {
        try {
            //const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);

            const rawBalance = await walletClient.read({
                address: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "totalAssets",
                args: [],
            });

            return Number(rawBalance.value);
        } catch (error) {
            throw Error(`Failed to fetch balance: ${error}`);
        }
    }

    @Tool({
        description: "Get the TotalSupply of an ERC4626 vault.",
    })
    async getTotalSupply(walletClient: EVMWalletClient, parameters: GetPoolTotalSupplyParameters) {
        try {
            //const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);

            const rawBalance = await walletClient.read({
                address: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", //parameters.poolAddress,
                abi: ERC4626_ABI,
                functionName: "totalSupply",
                args: [],
            });

            return Number(rawBalance.value);
        } catch (error) {
            throw Error(`Failed to fetch balance: ${error}`);
        }
    }
}
