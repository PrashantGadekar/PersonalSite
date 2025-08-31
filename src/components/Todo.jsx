import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { todoService } from './todoService';
import './Todo.css';

export default function Todo({ onBack }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Load todos from IndexedDB on component mount
  useEffect(() => {
    initializeTodoApp();
  }, []);

  const initializeTodoApp = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check if database is available
      const isAvailable = await todoService.isDatabaseAvailable();
      if (!isAvailable) {
        throw new Error('Database not available. Your browser may not support IndexedDB.');
      }
      
      await loadTodos();
    } catch (err) {
      setError('Failed to initialize app: ' + err.message);
      console.error('Error initializing todo app:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTodos = async () => {
    try {
      const todosFromDB = await todoService.getAllTodos();
      setTodos(todosFromDB);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to load todos: ' + err.message);
      console.error('Error loading todos:', err);
    }
  };

  // Generate random floating balls (consistent with other components)
  const FloatingBalls = () => {
    const balls = [];
    for (let i = 0; i < 12; i++) {
      const colors = ['#ffffff', '#93c5fd', '#c4b5fd', '#86efac'];
      balls.push(
        <motion.div
          key={i}
          className="todo-floating-ball"
          style={{
            width: Math.random() * 8 + 3 + 'px',
            height: Math.random() * 8 + 3 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            backgroundColor: colors[i % 4],
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 8,
          }}
        />
      );
    }
    return balls;
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      setError(''); // Clear any previous errors
      await todoService.addTodo(newTodo);
      setNewTodo('');
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      setError(''); // Clear any previous errors
      await todoService.toggleTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to update todo');
      console.error('Error toggling todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setError(''); // Clear any previous errors
      await todoService.deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleExportTodos = async () => {
    try {
      const jsonData = await todoService.exportTodos();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `todos-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export todos');
      console.error('Error exporting todos:', err);
    }
  };

  const handleImportTodos = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      await todoService.importTodos(text);
      await loadTodos();
      setError('');
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to import todos: ' + err.message);
      console.error('Error importing todos:', err);
    }
  };

  const handleClearAllTodos = async () => {
    if (window.confirm('Are you sure you want to delete all todos? This action cannot be undone.')) {
      try {
        await todoService.clearAllTodos();
        await loadTodos();
      } catch (err) {
        setError('Failed to clear todos');
        console.error('Error clearing todos:', err);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (loading) {
    return (
      <div className="todo-container">
        <div className="todo-content">
          <div style={{ textAlign: 'center', color: 'white', marginTop: '2rem' }}>
            Loading todos...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-container">
      {/* Floating balls background */}
      <div className="todo-floating-balls">
        <FloatingBalls />
      </div>

      {/* Back button */}
      {onBack && (
        <button onClick={onBack} className="back-button">
          ← Back to Dashboard
        </button>
      )}

      {/* Main content */}
      <div className="todo-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="todo-header"
        >
          <h1 className="todo-title">My Todo List</h1>
          <p className="todo-subtitle">
            Stay organized and productive with offline todo management
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(248, 113, 113, 0.5)',
              borderRadius: '0.75rem',
              padding: '1rem',
              color: '#fca5a5',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            {error}
          </motion.div>
        )}

        {/* Add Todo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="todo-input-section"
        >
          <form onSubmit={handleAddTodo} className="todo-input-form">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="todo-input"
              maxLength={200}
            />
            <button
              type="submit"
              disabled={!newTodo.trim()}
              className="todo-add-btn"
            >
              Add Todo
            </button>
          </form>
        </motion.div>

        {/* Stats */}
        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="todo-stats"
          >
            <span>Total: {totalCount}</span>
            <span>Completed: {completedCount}</span>
            <span>Remaining: {totalCount - completedCount}</span>
          </motion.div>
        )}

        {/* Todo List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="todo-list"
        >
          {todos.length === 0 ? (
            <div className="todo-empty">
              No todos yet. Add your first todo above! 📝
            </div>
          ) : (
            todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="todo-item"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  {todo.text}
                </span>
                <span className="todo-date">
                  {formatDate(todo.createdAt)}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="todo-delete-btn"
                >
                  Delete
                </button>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="todo-actions"
        >
          <button onClick={handleExportTodos} className="todo-action-btn todo-export-btn">
            📥 Export Backup
          </button>
          
          <label className="todo-action-btn todo-import-btn">
            📤 Import Backup
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportTodos}
              className="todo-file-input"
            />
          </label>
          
          {todos.length > 0 && (
            <button
              onClick={handleClearAllTodos}
              className="todo-action-btn todo-clear-btn"
            >
              🗑️ Clear All
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
