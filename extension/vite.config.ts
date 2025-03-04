import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: "manifest.json",
                    dest: ".",
                },
            ],
        }),
    ],
    build: {
        outDir: "dist",
        rollupOptions: {
            input: {
                popup: "src/popup/popup.html",
                background: "src/background/background.ts",
                content: "src/content/content.ts",
            },
            output: {
                entryFileNames: "scripts/[name].js",
                chunkFileNames: "scripts/[name].js",
                assetFileNames: "assets/[name].[ext]",
            },
        },
    },
});
