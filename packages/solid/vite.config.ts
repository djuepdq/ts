import solid from "solid-start/vite"
import solidStyled from "vite-plugin-solid-styled"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    solid(),
    solidStyled({
      prefix: "my-prefix", // optional
      filter: {
        include: "src/**/*.{ts,js,tsx,jsx}",
        exclude: "node_modules/**/*.{ts,js,tsx,jsx}",
      },
    }),
  ],
})
