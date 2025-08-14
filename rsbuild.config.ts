import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { InjectManifest } from "@aaroon/workbox-rspack-plugin"

export default defineConfig({
	plugins: [pluginReact()],
	output: {
		assetPrefix: "/",
		filename: {
			js: "static/js/[name].[contenthash].js",
			css: "static/css/[name].[contenthash].css",
			media: "static/media/[name].[hash][ext]",
		},
	},
	performance: {
		removeConsole: ["log", "warn"],
	},
	html: {
		template: "./src/index.html",
	},
	tools: {
		rspack: (config, { isProd }) => {
			if (isProd) {
				config.plugins?.push(
					new InjectManifest({
						swSrc: "./src/sw.ts",
						swDest: "sw.js",
						exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
					}),
				)
			}
		},
	},
})
