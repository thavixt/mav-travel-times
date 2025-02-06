import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dsv from '@rollup/plugin-dsv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dsv(),
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler"],
        ],
      },
    }),
  ],
  // @TODO change project name in package.json aswell
  base: "/mav-travel-times/"
})
