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
/*
private tokens: Token[];

constructor({ tokens }: { tokens?: Token[] } = {}) {
    this.tokens = tokens ?? [];
}

@Tool({
    description: "Get the ERC20 token info by its symbol, including the contract address, decimals, and name",
})
async getTokenInfoBySymbol(walletClient: EVMWalletClient, parameters: GetTokenInfoBySymbolParameters) {
    const token = this.tokens.find((token) =>
        [token.symbol, token.symbol.toLowerCase()].includes(parameters.symbol),
    );

    if (!token) {
        throw Error(`Token with symbol ${parameters.symbol} not found`);
    }

    const chain = walletClient.getChain();

    const contractAddress = token.chains[chain.id]?.contractAddress;

    if (!contractAddress) {
        throw Error(`Token with symbol ${parameters.symbol} not found on chain ${chain.id}`);
    }

    return {
        symbol: token?.symbol,
        contractAddress,
        decimals: token?.decimals,
        name: token?.name,
    };
}

@Tool({
    description: "Get the balance of an ERC20 token in base units. Convert to decimal units before returning.",
})
async getTokenBalance(walletClient: EVMWalletClient, parameters: GetTokenBalanceParameters) {
    try {
        const resolvedWalletAddress = await walletClient.resolveAddress(parameters.wallet);

        const rawBalance = await walletClient.read({
            address: parameters.tokenAddress,
            abi: ERC20_ABI,
            functionName: "balanceOf",
            args: [resolvedWalletAddress],
        });

        return Number(rawBalance.value);
    } catch (error) {
        throw Error(`Failed to fetch balance: ${error}`);
    }
}

@Tool({
    description: "Transfer an amount of an ERC20 token to an address",
})
async transfer(walletClient: EVMWalletClient, parameters: TransferParameters) {
    try {
        const to = await walletClient.resolveAddress(parameters.to);

        const hash = await walletClient.sendTransaction({
            to: parameters.tokenAddress,
            abi: ERC20_ABI,
            functionName: "transfer",
            args: [to, parameters.amount],
        });
        return hash.hash;
    } catch (error) {
        throw Error(`Failed to transfer: ${error}`);
    }
}

@Tool({
    description: "Get the total supply of an ERC20 token",
})
async getTokenTotalSupply(walletClient: EVMWalletClient, parameters: GetTokenTotalSupplyParameters) {
    try {
        const rawTotalSupply = await walletClient.read({
            address: parameters.tokenAddress,
            abi: ERC20_ABI,
            functionName: "totalSupply",
        });

        return rawTotalSupply.value;
    } catch (error) {
        throw Error(`Failed to fetch total supply: ${error}`);
    }
}

@Tool({
    description: "Get the allowance of an ERC20 token",
})
async getTokenAllowance(walletClient: EVMWalletClient, parameters: GetTokenAllowanceParameters) {
    try {
        const owner = await walletClient.resolveAddress(parameters.owner);
        const spender = await walletClient.resolveAddress(parameters.spender);

        const rawAllowance = await walletClient.read({
            address: parameters.tokenAddress,
            abi: ERC20_ABI,
            functionName: "allowance",
            args: [owner, spender],
        });
        return Number(rawAllowance.value);
    } catch (error) {
        throw Error(`Failed to fetch allowance: ${error}`);
    }
}

@Tool({
    description: "Approve an amount of an ERC20 token to an address",
})
async approve(walletClient: EVMWalletClient, parameters: ApproveParameters) {
    try {
        const spender = await walletClient.resolveAddress(parameters.spender);

        const hash = await walletClient.sendTransaction({
            to: parameters.tokenAddress,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [spender, parameters.amount],
        });
        return hash.hash;
    } catch (error) {
        throw Error(`Failed to approve: ${error}`);
    }
}

@Tool({
    description: "Revoke approval for an ERC20 token to an address",
})
async revokeApproval(walletClient: EVMWalletClient, parameters: RevokeApprovalParameters) {
    try {
        const spender = await walletClient.resolveAddress(parameters.spender);

        const hash = await walletClient.sendTransaction({
            to: parameters.tokenAddress,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [spender, 0],
        });
        return hash.hash;
    } catch (error) {
        throw Error(`Failed to revoke approval: ${error}`);
    }
}

@Tool({
    description: "Transfer an amount of an ERC20 token from an address to another address",
})
async transferFrom(walletClient: EVMWalletClient, parameters: TransferFromParameters) {
    try {
        const from = await walletClient.resolveAddress(parameters.from);
        const to = await walletClient.resolveAddress(parameters.to);

        const hash = await walletClient.sendTransaction({
            to: parameters.tokenAddress,
            abi: ERC20_ABI,
            functionName: "transferFrom",
            args: [from, to, parameters.amount],
        });
        return hash.hash;
    } catch (error) {
        throw Error(`Failed to transfer from: ${error}`);
    }
}

@Tool({
    description: "Convert an amount of an ERC20 token to its base unit",
})
async convertToBaseUnit(parameters: ConvertToBaseUnitParameters) {
    const { amount, decimals } = parameters;
    const baseUnit = amount * 10 ** decimals;
    return Number(baseUnit);
}

@Tool({
    description: "Convert an amount of an ERC20 token from its base unit to its decimal unit",
})
async convertFromBaseUnit(parameters: ConvertFromBaseUnitParameters) {
    const { amount, decimals } = parameters;
    const decimalUnit = amount / 10 ** decimals;
    return Number(decimalUnit);
}
}
*/