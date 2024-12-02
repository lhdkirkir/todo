import React from 'react';
import Todo from './components/Todo';

// App 组件：应用的根组件
function App() {
  return (
    // 主容器：设置最小高度和内边距
    <div className="min-h-screen p-4">
      {/* 渲染 Todo 组件 */}
      <Todo />
    </div>
  );
}

export default App;
