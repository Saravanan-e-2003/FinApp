import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [tailwindcss(), react()],
    define: {
      // Make env variables available to the app
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // Enable env variables prefixed with VITE_
    envPrefix: 'VITE_',
  };
});
