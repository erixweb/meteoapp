import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import tailwindcss from "tailwindcss"

export default defineConfig({
	plugins: [pluginReact()],
	tools: {
		postcss: {
      postcssOptions: {
        plugins: [
          tailwindcss({
            content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
            // ...other options
          }),
        ]
      }
		},
	},
})
