import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer" // Import autoprefixer

export default defineConfig({
	plugins: [pluginReact()],
	output: {
		filename: {
			js: "static/js/[name].[contenthash].js",
			css: "static/css/[name].[contenthash].css",
			media: "static/media/[name].[hash][ext]",
		},
	},
	performance: {
		// Enable production-specific performance optimizations
		removeConsole: true, // Remove console.log statements
	},
})
