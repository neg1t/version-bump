import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
// import { vitePluginVersionMark } from "vite-plugin-version-mark";

const getVersionVariable: () => Plugin = () => ({
  name: "version-variable",
  config(config) {
    // get version in vitePlugin if you open `ifGlobal`
    console.log(config.define);
    return defineConfig({
      define: {
        "import.meta.env.APP_VERSION": JSON.stringify(
          config.define?.__TEST_APP_VERSION__
            ?.replaceAll(/"/g, "")
            .replaceAll('"', "") || "0.0.0",
        ),
      },
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // vitePluginVersionMark({
    //   name: "test-app",
    //   // version: '0.0.1',
    //   command: "git describe --tags --always",
    //   outputFile: (version) => ({
    //     path: "src/shared/version/version.json",
    //     content: `{"version":"${version}"}`,
    //   }),
    //   // ifGitSHA: true,
    //   // ifShortSHA: true,
    //   // ifMeta: true,
    //   ifLog: true,
    //   ifGlobal: true,
    // }),
    getVersionVariable(),
  ],
  server: {
    port: 8000,
  },
});
