import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Read package.json to get the repository name
const packageJson = require('./package.json');
const homepage = packageJson.homepage || '';
const basePath = homepage ? new URL(homepage).pathname : '/';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? basePath : '/',
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    outDir: "build",
  },
  server: {
    port: 3000,
    open: true,
  },
});
