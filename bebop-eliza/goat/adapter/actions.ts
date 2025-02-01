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
            name: "DEPOSIT_TO_VAULT",
            description: "Deposit an amount into the ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [],
        },
        {
            name: "WITHDRAW_FROM_VAULT",
            description: "Withdraw an amount from the ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [],
        },
        {
            name: "GET_MAX_WITHDRAW",
            description: "Get the max withdrawal amount of an ERC4626 vault",
            similes: [],
            validate: async () => true,
            examples: [],
        },
        {
            name: "GET_VAULT_OWNER",
            description: "Get the owner of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [],
        },
        {
            name: "GET_VAULT_SYMBOL",
            description: "Get the symbol of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [],
        },
        {
            name: "GET_VAULT_NAME",
            description: "Get the name of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [],
        },
        {
            name: "GET_UNDERLYING_TOKEN",
            description: "Get the underlying Token of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [],
        },
        {
            name: "GET_TOTAL_ASSETS",
            description: "Get the TotalAssets of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [],
        },
        {
            name: "GET_TOTAL_SUPPLY",
            description: "Get the TotalSupply of an ERC4626 vault.",
            similes: [],
            validate: async () => true,
            examples: [],
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
            const result = await generateText({
                runtime,
                context,
                tools,
                maxSteps: 10,
                // Uncomment to see the log each tool call when debugging
                // onStepFinish: (step) => {
                //     console.log(step.toolResults);
                // },
                modelClass: ModelClass.LARGE,
            });

            // 2. Compose the response
            const response = composeResponseContext(result, currentState);
            const responseText = await generateResponse(runtime, response);

            callback?.({
                text: responseText,
                content: {},
            });
            return true;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);

            // 3. Compose the error response
            const errorResponse = composeErrorResponseContext(
                errorMessage,
                currentState
            );
            const errorResponseText = await generateResponse(
                runtime,
                errorResponse
            );

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

async function generateResponse(
    runtime: IAgentRuntime,
    context: string
): Promise<string> {
    return generateText({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
    });
}
