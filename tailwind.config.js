/** @type {import('tailwindcss').Config} */
module.exports = {
  // 指定要处理的文件
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 自定义颜色配置
      colors: {
        'apple-blue': '#0066cc', // 主要按钮颜色
        'apple-red': '#ff3b30',  // 删除按钮颜色
        'apple-gray': {
          50: '#f5f5f7',   // 背景色
          100: '#e5e5e7',  // 边框色
          500: '#86868b',  // 次要文本
          900: '#1d1d1f',  // 主要文本
        },
      },
    },
  },
  plugins: [], // Tailwind 插件配置
} 