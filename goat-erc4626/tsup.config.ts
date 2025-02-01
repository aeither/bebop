import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
    format: ["esm"],
    external: [
        "@goat-sdk/core",
        "@goat-sdk/wallet-evm",
        "zod",
    ],
});
