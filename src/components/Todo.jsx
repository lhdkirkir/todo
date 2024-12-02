import React, { useState } from 'react';

const Todo = () => {
  // 状态管理
  const [todos, setTodos] = useState([]); // 存储所有待办事项的数组
  const [input, setInput] = useState(''); // 输入框的值
  const [editId, setEditId] = useState(null); // 当前正在编辑的待办事项ID
  const [editText, setEditText] = useState(''); // 编辑时的文本内容

  // 添加新的待办事项
  const addTodo = (e) => {
    e.preventDefault(); // 阻止表单默认提交行为
    if (input.trim() !== '') { // 确保输入不为空
      setTodos([...todos, {
        id: Date.now(), // 使用时间戳作为唯一ID
        text: input,
        completed: false // 初始状态为未完成
      }]);
      setInput(''); // 清空输入框
    }
  };

  // 删除待办事项
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); // 过滤掉要删除的项
  };

  // 切换待办事项的完成状态
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 开始编辑待办事项
  const startEdit = (id, text) => {
    setEditId(id); // 设置当前编辑项的ID
    setEditText(text); // 设置编辑框的初始文本
  };

  // 保存编辑后的内容
  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditId(null); // 退出编辑模式
  };

  return (
    // 主容器：使用Tailwind CSS设置样式
    <div className="max-w-3xl mx-auto mt-12 p-10 bg-white/95 rounded-2xl shadow-lg backdrop-blur-md">
      {/* 标题 */}
      <h1 className="text-4xl font-semibold text-apple-gray-900 mb-10 text-left tracking-tight">
        待办事项
      </h1>
      
      {/* 添加待办事项的表单 */}
      <form onSubmit={addTodo} className="flex gap-4 mb-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="添加新的待办事项..."
          className="flex-1 px-5 py-3.5 bg-apple-gray-50 rounded-xl border-none text-apple-gray-900 
                   focus:outline-none focus:ring-2 focus:ring-apple-blue focus:bg-white transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3.5 bg-apple-blue text-white rounded-xl font-medium 
                   hover:bg-apple-blue/90 hover:-translate-y-0.5 transition-all"
        >
          添加
        </button>
      </form>
      
      {/* 待办事项列表 */}
      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`flex items-center p-5 bg-apple-gray-50 rounded-xl transition-all
                      hover:bg-white hover:shadow-sm ${todo.completed ? 'opacity-75' : ''}`}
          >
            {/* 编辑模式 */}
            {editId === todo.id ? (
              <div className="flex gap-4 flex-1">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white rounded-lg border border-apple-gray-100
                           focus:outline-none focus:ring-2 focus:ring-apple-blue"
                />
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="px-4 py-2 bg-apple-blue text-white rounded-lg font-medium
                           hover:bg-apple-blue/90 transition-colors"
                >
                  保存
                </button>
              </div>
            ) : (
              // 显示模式
              <>
                {/* 完成状态复选框 */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-6 h-6 rounded-lg border-apple-gray-100 text-apple-blue 
                           focus:ring-apple-blue cursor-pointer"
                />
                {/* 待办事项文本 */}
                <span className={`flex-1 mx-4 text-apple-gray-900
                              ${todo.completed ? 'line-through text-apple-gray-500' : ''}`}>
                  {todo.text}
                </span>
                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(todo.id, todo.text)}
                    className="px-4 py-2 bg-apple-gray-50 text-apple-blue rounded-lg font-medium
                             hover:bg-apple-gray-100 transition-colors"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-4 py-2 bg-apple-gray-50 text-apple-red rounded-lg font-medium
                             hover:bg-red-50 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo; 