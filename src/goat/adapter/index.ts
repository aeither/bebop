import type { Plugin } from "@elizaos/core";
import { getOnChainActions } from "./actions";
import { getWalletClient, getWalletProvider } from "./wallet";

async function createGoatPlugin(
    getSetting: (key: string) => string | undefined
): Promise<Plugin> {
    const walletClient = getWalletClient(getSetting);
    if (!walletClient) {
        throw new Error("Failed to initialize wallet client. Please check if EVM_PRIVATE_KEY is configured.");
    }
    const actions = await getOnChainActions(walletClient);

    return {
        name: "[GOAT] Onchain Actions",
        description: "Mode integration plugin",
        providers: [getWalletProvider(walletClient)],
        evaluators: [],
        services: [],
        actions: actions,
    };
}

export default createGoatPlugin;
