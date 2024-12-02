import React, { useState } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditId(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-10 bg-white/95 rounded-2xl shadow-lg backdrop-blur-md">
      <h1 className="text-4xl font-semibold text-apple-gray-900 mb-10 text-left tracking-tight">
        待办事项
      </h1>
      
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
      
      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`flex items-center p-5 bg-apple-gray-50 rounded-xl transition-all
                      hover:bg-white hover:shadow-sm ${todo.completed ? 'opacity-75' : ''}`}
          >
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
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-6 h-6 rounded-lg border-apple-gray-100 text-apple-blue 
                           focus:ring-apple-blue cursor-pointer"
                />
                <span className={`flex-1 mx-4 text-apple-gray-900
                              ${todo.completed ? 'line-through text-apple-gray-500' : ''}`}>
                  {todo.text}
                </span>
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