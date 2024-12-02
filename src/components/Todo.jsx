import React, { useState, useEffect, useRef } from 'react';

const Todo = () => {
  // 状态管理
  const [todos, setTodos] = useState([]); // 存储所有待办事项的数组
  const [input, setInput] = useState(''); // 输入框的值
  const [editId, setEditId] = useState(null); // 当前正在编辑的待办事项ID
  const [editText, setEditText] = useState(''); // 编辑时的文本内容
  const [showReminderModal, setShowReminderModal] = useState(false); // 新增：控制提醒时间弹窗
  const [reminderDate, setReminderDate] = useState('');
  const [tempTodo, setTempTodo] = useState(null); // 新增：临时存储待添加的待办事项

  // 添加输入框引用
  const inputRef = useRef(null);

  // 添加键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showReminderModal) return; // 只在弹窗显示时处理键盘事件

      if (e.key === 'Enter') {
        e.preventDefault(); // 防止表单提交
        confirmAddTodo();
      } else if (e.key === 'Escape') {
        cancelAddTodo();
      }
    };

    // 添加事件监听
    document.addEventListener('keydown', handleKeyDown);

    // 清理事件监听
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showReminderModal]); // 依赖项包含 showReminderModal

  // 获取当前时间并格式化为datetime-local输入框所需的格式
  const getCurrentDateTime = () => {
    const now = new Date();
    // 补零函数
    const pad = (num) => num.toString().padStart(2, '0');
    
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  };

  // 添加新的待办事项
  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      // 先保存待办事项信息，并显示提醒时间设置弹窗
      setTempTodo({
        id: Date.now(),
        text: input,
        completed: false
      });
      // 设置默认时间为当前时间
      setReminderDate(getCurrentDateTime());
      setShowReminderModal(true);
    }
  };

  // 确认添加待办事项（包含提醒时间）
  const confirmAddTodo = () => {
    setTodos([...todos, {
      ...tempTodo,
      reminderDate: reminderDate || null
    }]);
    setInput('');
    setReminderDate('');
    setShowReminderModal(false);
    setTempTodo(null);
    // 聚焦到输入框
    inputRef.current?.focus();
  };

  // 取消添加待办事项
  const cancelAddTodo = () => {
    setShowReminderModal(false);
    setReminderDate('');
    setTempTodo(null);
    setInput(''); // 清空输入框
    // 聚焦到输入框
    inputRef.current?.focus();
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
  const startEdit = (id, text, date) => {
    setEditId(id);
    setEditText(text);
  };

  // 保存编辑后的内容
  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { 
        ...todo, 
        text: editText,
        reminderDate: reminderDate || null // 新增：更新提醒日期
      } : todo
    ));
    setEditId(null);
  };

  // 新增：格式化日期显示
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    // 主容器：使用Tailwind CSS设置样式
    <div className="max-w-3xl mx-auto mt-12 p-10 bg-white/95 rounded-2xl shadow-lg backdrop-blur-md
                    animate-fade-in">
      {/* 标题 */}
      <h1 className="text-4xl font-semibold text-apple-gray-900 mb-10 text-left tracking-tight
                     animate-typing">
        待办事项
      </h1>
      
      {/* 添加待办事项的表单 */}
      <form onSubmit={addTodo} className="flex gap-4 mb-10 animate-float">
        <input
          ref={inputRef}
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

      {/* 提醒时间设置弹窗 */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50
                      animate-fade-in">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full mx-4
                        animate-scale-up">
            <h2 className="text-xl font-semibold text-apple-gray-900 mb-4">
              设置提醒时间
            </h2>
            <p className="text-apple-gray-500 mb-4">
              待办事项：{tempTodo?.text}
            </p>
            <input
              type="datetime-local"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className="w-full px-4 py-2 bg-apple-gray-50 rounded-xl border-none mb-4
                       focus:outline-none focus:ring-2 focus:ring-apple-blue focus:bg-white"
              autoFocus // 自动聚焦到时间输入框
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelAddTodo}
                className="px-4 py-2 bg-apple-gray-50 text-apple-gray-900 rounded-lg font-medium
                         hover:bg-apple-gray-100 transition-colors"
              >
                取消 (Esc)
              </button>
              <button
                onClick={confirmAddTodo}
                className="px-4 py-2 bg-apple-blue text-white rounded-lg font-medium
                         hover:bg-apple-blue/90 transition-colors"
              >
                确定 (Enter)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 待办事项列表 */}
      <ul className="space-y-3">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className={`flex items-center p-5 bg-apple-gray-50 rounded-xl transition-all
                      hover:bg-white hover:shadow-sm hover:-translate-y-0.5
                      ${todo.completed ? 'opacity-75' : ''}
                      animate-slide-in`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {editId === todo.id ? (
              <div className="flex flex-col gap-4 flex-1">
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
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-6 h-6 rounded-lg border-apple-gray-100 text-apple-blue 
                           focus:ring-apple-blue cursor-pointer"
                />
                <div className="flex-1 mx-4">
                  <span className={`block text-apple-gray-900
                                ${todo.completed ? 'line-through text-apple-gray-500' : ''}`}>
                    {todo.text}
                  </span>
                  {todo.reminderDate && (
                    <span className="block text-sm text-apple-gray-500 mt-1">
                      提醒时间: {formatDate(todo.reminderDate)}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(todo.id, todo.text, todo.reminderDate)}
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