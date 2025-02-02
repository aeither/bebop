import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import type { PluginBase, WalletClientBase } from "@goat-sdk/core";
import { type Token, erc20 } from "@goat-sdk/plugin-erc20";
import { sendETH } from "@goat-sdk/wallet-evm";

import {
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
    composeContext,
    generateText,
} from "@elizaos/core";
import { erc4626 } from "../erc4626/erc4626.plugin.js";
import type { Vault } from "../erc4626/vault.js";

const sozuHausResident: Token = {
    decimals: 18,
    symbol: "SHR",
    name: "SozuHausResident",
    chains: {
        "5003": {
            // Mantle Sepolia chain ID
            contractAddress: "0xdeB1e008F224c959B75aCCA5413a150DC7049E67", // Replace with actual contract address
        },
    },
};

// Define sozuHausResident Vault
const sozuHausResidentVault: Vault = {
    name: "SozuHausResidentVault",
    chains: {
        "5003": {
            // Mantle Sepolia chain ID
            contractAddress: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", // Replace with actual contract address
        },
    },

};

export async function getOnChainActions(wallet: WalletClientBase) {
    const actionsWithoutHandler = [
        {
            name: "deposit",
            description: "Deposit an amount into the ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "I want to invest 333 tokens into the SozuHausResident vault.",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "Certainly! I'll help you deposit 333 tokens into the SozuHausResident vault.",
                            action: "deposit",
                        },
                    },
                ],
            ],
        },
        {
            name: "withdraw",
            description: "Withdraw an amount from the ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "I need to withdraw all my funds from the SozuHausResident vault.",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "Of course! I'll initiate a withdrawal of the maximum amount from the SozuHausResident vault to your wallet address.",
                            action: "withdraw",
                        },
                    },
                ],
            ],
        },
        {
            name: "getMaxWithdraw",
            description: "Get the max withdrawal amount of an ERC4626 vault",
            similes: [],
            validate: async () => true,
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "How much can I withdraw from the SozuHausResident vault?",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "Let me check the maximum withdrawal amount for your wallet from the SozuHausResident vault.",
                            action: "getMaxWithdraw",
                        },
                    },
                ],
            ],
        },
        {
            name: "getOwner",
            description: "Get the owner of an ERC4626 vault.",
            similes: [],

            validate: async (runtime: IAgentRuntime, message: Memory) => {
                // Check for document attachment
                console.log("✅ Validate: ", message);

                return true;
            },
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "Who owns the SozuHausResident vault?",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "I'll find out who the owner of the SozuHausResident vault is for you.",
                            action: "getOwner",
                        },
                    },
                ],
            ],
        },
        {
            name: "getSymbol",
            description: "Get the symbol of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "What's the token symbol for the SozuHausResident vault?",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "I'll retrieve the symbol of the token in the SozuHausResident vault for you.",
                            action: "getSymbol",
                        },
                    },
                ],
            ],
        },
        {
            name: "getName",
            description: "Get the name of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "What's the full name of the vault at 0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4?",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "I'll fetch the full name of the vault at 0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4 for you.",
                            action: "getName",
                        },
                    },
                ],
            ],
        },
        {
            name: "getUnderlyingToken",
            description: "Get the underlying Token of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "What's the underlying token for the SozuHausResident vault?",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "I'll find out the underlying token of the SozuHausResident vault for you.",
                            action: "getUnderlyingToken",
                        },
                    },
                ],
            ],
        },
        {
            name: "getTotalAssets",
            description: "Get the TotalAssets of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "How many assets are currently in the SozuHausResident vault?",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "I'll check the total assets currently held in the SozuHausResident vault.",
                            action: "getTotalAssets",
                        },
                    },
                ],
            ],
        },
        {
            name: "getTotalSupply",
            description: "Get the TotalSupply of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [
                [
                    {
                        user: "{{user1}}",
                        content: {
                            text: "What's the total supply of tokens in the SozuHausResident vault?",
                        },
                    },
                    {
                        user: "{{user2}}",
                        content: {
                            text: "I'll retrieve the total supply of tokens in the SozuHausResident vault for you.",
                            action: "getTotalSupply",
                        },
                    },
                ],
            ],
        },
    ];

    const tools = await getOnChainTools({
        wallet: wallet,
        // 2. Configure the plugins you need to perform those actions
        plugins: [sendETH() as unknown as PluginBase<WalletClientBase>, erc20({ tokens: [sozuHausResident] }), erc4626({ vaults: [sozuHausResidentVault] }),],
    });

    // 3. Let GOAT handle all the actions
    return actionsWithoutHandler.map((action) => ({
        ...action,
        handler: getActionHandler(action.name, action.description, tools),
    }));
}

function getActionHandler(
    actionName: string,
    actionDescription: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    tools: any
) {
    return async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State | undefined,
        _options?: Record<string, unknown>,
        callback?: HandlerCallback
    ): Promise<boolean> => {
        let currentState = state ?? (await runtime.composeState(message));
        currentState = await runtime.updateRecentMessageState(currentState);

        try {
            // 1. Call the tools needed
            const context = composeActionContext(
                actionName,
                actionDescription,
                currentState
            );
            console.log("🚀 ~ context:", context)
            const result = await generateText({
                runtime,
                context,
                tools,
                maxSteps: 10,
                // Uncomment to see the log each tool call when debugging
                onStepFinish: (step) => {
                    console.log("🦵step: ", step.toolResults);
                },
                modelClass: ModelClass.LARGE,
            });
            console.log("🚀 ~ result:", result)

            // 2. Compose the response
            // const response = composeResponseContext(result, currentState);
            // const responseText = await generateText({
            //     runtime,
            //     context: response,
            //     modelClass: ModelClass.SMALL,
            // });

            callback?.({
                text: result,
                content: {},
            });
            return true;
        } catch (error) {
            console.log("🚀 ~ error:", error)
            const errorMessage =
                error instanceof Error ? error.message : String(error);

            // 3. Compose the error response
            const errorResponse = composeErrorResponseContext(
                errorMessage,
                currentState
            );
            const errorResponseText = await generateText({
                runtime,
                context: errorResponse,
                modelClass: ModelClass.SMALL,
            });

            callback?.({
                text: errorResponseText,
                content: { error: errorMessage },
            });
            return false;
        }
    };
}

function composeActionContext(
    actionName: string,
    actionDescription: string,
    state: State
): string {
    const actionTemplate = `
# Knowledge
{{knowledge}}

About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}


# Action: ${actionName}
${actionDescription}

{{recentMessages}}

Based on the action chosen and the previous messages, execute the action and respond to the user using the tools you were given.

Do notresolve ENS name. Bigint are strings
`;
    return composeContext({ state, template: actionTemplate });
}

function composeResponseContext(result: unknown, state: State): string {
    const responseTemplate = `
    # Action Examples
{{actionExamples}}
(Action examples are for reference only. Do not use the information from them in your response.)

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs. Recent attachments have been included above under the "Attachments" section.

Here is the result:
${JSON.stringify(result)}

{{actions}}

Respond to the message knowing that the action was successful and these were the previous messages:
{{recentMessages}}
  `;
    return composeContext({ state, template: responseTemplate });
}

function composeErrorResponseContext(
    errorMessage: string,
    state: State
): string {
    const errorResponseTemplate = `
# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs. Recent attachments have been included above under the "Attachments" section.

{{actions}}

Respond to the message knowing that the action failed.
The error was:
${errorMessage}

These were the previous messages:
{{recentMessages}}
    `;
    return composeContext({ state, template: errorResponseTemplate });
}
