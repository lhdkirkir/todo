import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 导入全局样式
import App from './App';

// 创建 React 根节点
const root = ReactDOM.createRoot(document.getElementById('root'));
// 渲染应用
root.render(
  // StrictMode 用于突出显示应用程序中潜在问题
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
