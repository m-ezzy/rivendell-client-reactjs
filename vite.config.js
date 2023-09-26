import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	mode: 'development',
	server: {
		cors: true,
		proxy: {
			"/api": {
				target: "http://localhost:8000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
			'/socket.io': {
        target: 'ws://localhost:8000',
        ws: true,
      },
		},
	},
	build: {
		outDir: "./build",
		manifest: true,
		rollupOptions: {
			input: "./src/main.jsx",
		},
	},
});
