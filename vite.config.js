// vite.config.json
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import macrosPlugin from 'vite-plugin-babel-macros';
import wasmPack from 'vite-plugin-wasm-pack';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), macrosPlugin(), wasmPack([], ['photon-web'])],
  define: {
    'process.platform': JSON.stringify('win32'),
    'process.env': {},
  },
});
