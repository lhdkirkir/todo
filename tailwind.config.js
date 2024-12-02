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
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-up': 'scale-up 0.3s ease-out',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'typing': 'typing 2s steps(20, end)',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [], // Tailwind 插件配置
} 