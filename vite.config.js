
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    resolve: {
     alias: {
        '@': '/src'
     }   
    },
      css: {
    preprocessorOptions: {
scss: {
  additionalData: `@import "${path.join(__dirname, 'src/styles/main.scss')}";`
}
    }
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.html'),
      output: {
        format: 'iife'
      }
    }
  }
});
