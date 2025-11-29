// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Add this 'optimizeDeps' section to fix the Apollo import error
  optimizeDeps: {
    include: ["@apollo/client", "graphql"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // Helps with mixed module types
    },
  },
});
