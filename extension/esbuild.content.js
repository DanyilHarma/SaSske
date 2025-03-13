import esbuild from "esbuild";

esbuild
    .build({
        entryPoints: ["src/content/content.ts"],
        bundle: true,
        outfile: "dist/scripts/content.js",
        format: "iife",
        platform: "browser",
        target: "es2020",
        minify: true,
    })
    .catch(() => process.exit(1));
