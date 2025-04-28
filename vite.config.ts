// venshort-improved-new/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // !!! أضف هذا السطر !!!
  base: '/Venshort2/', // استبدل Venshort2 باسم مستودعك إذا كان مختلفاً
  plugins: [react()],
})