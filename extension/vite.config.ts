import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                { src: "manifest.json", dest: "." },
                { src: "src/popup/popup.html", dest: "." },
            ],
        }),
    ],
    build: {
        outDir: "dist",
        rollupOptions: {
            input: {
                popup: "src/popup/popup.tsx",
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
