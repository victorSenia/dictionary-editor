import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  const isSingleFile = mode === "singlefile";
  const strictCsp =
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' ws: http: https:";
  const singleFileCsp =
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' ws: http: https:";

  const singleFileCspPlugin = {
    name: "singlefile-csp",
    transformIndexHtml(html: string) {
      return html.replace(strictCsp, singleFileCsp);
    }
  };

  return {
    base: "./",
    plugins: isSingleFile ? [react(), viteSingleFile(), singleFileCspPlugin] : [react()],
    server: {
      port: 5173,
      strictPort: true
    },
    build: {
      outDir: isSingleFile ? "dist/renderer-singlefile" : "dist/renderer",
      emptyOutDir: true
    }
  };
});
