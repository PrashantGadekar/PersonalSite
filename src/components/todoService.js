import Dexie from 'dexie';

// Define the database
class TodoDatabase extends Dexie {
  constructor() {
    super('TodoDatabase');
    
    // Define schemas
    this.version(1).stores({
      todos: '++id, text, completed, createdAt, updatedAt'
    });
    
    // Handle database events
    this.open().catch(err => {
      console.error('Failed to open database:', err);
    });
  }
}

// Create a database instance
let db;

// Initialize database with error handling
const initDatabase = async () => {
  try {
    if (!db) {
      db = new TodoDatabase();
      await db.open();
    }
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    // Try to delete and recreate database if corrupted
    if (db) {
      await db.delete();
    }
    db = new TodoDatabase();
    await db.open();
    return db;
  }
};

// Database operations
export const todoService = {
  // Add a new todo
  async addTodo(text) {
    try {
      const database = await initDatabase();
      const now = new Date();
      return await database.todos.add({
        text: text.trim(),
        completed: false,
        createdAt: now,
        updatedAt: now
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      throw new Error('Failed to add todo. Please try again.');
    }
  },

  // Get all todos
  async getAllTodos() {
    try {
      const database = await initDatabase();
      return await database.todos.orderBy('createdAt').toArray();
    } catch (error) {
      console.error('Error getting todos:', error);
      return []; // Return empty array on error
    }
  },

  // Update todo completion status
  async toggleTodo(id) {
    try {
      const database = await initDatabase();
      const todo = await database.todos.get(id);
      if (todo) {
        return await database.todos.update(id, {
          completed: !todo.completed,
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw new Error('Failed to update todo. Please try again.');
    }
  },

  // Delete a todo
  async deleteTodo(id) {
    try {
      const database = await initDatabase();
      return await database.todos.delete(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw new Error('Failed to delete todo. Please try again.');
    }
  },

  // Clear all todos
  async clearAllTodos() {
    try {
      const database = await initDatabase();
      return await database.todos.clear();
    } catch (error) {
      console.error('Error clearing todos:', error);
      throw new Error('Failed to clear todos. Please try again.');
    }
  },

  // Export todos as JSON
  async exportTodos() {
    try {
      const todos = await this.getAllTodos();
      return JSON.stringify(todos, null, 2);
    } catch (error) {
      console.error('Error exporting todos:', error);
      throw new Error('Failed to export todos. Please try again.');
    }
  },

  // Import todos from JSON
  async importTodos(jsonData) {
    try {
      const todos = JSON.parse(jsonData);
      if (!Array.isArray(todos)) {
        throw new Error('Invalid JSON format - expected an array of todos');
      }
      
      const database = await initDatabase();
      
      // Clear existing todos and import new ones
      await database.todos.clear();
      
      const todosToImport = todos.map(todo => ({
        text: todo.text || 'Untitled Todo',
        completed: Boolean(todo.completed),
        createdAt: todo.createdAt ? new Date(todo.createdAt) : new Date(),
        updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : new Date()
      }));
      
      return await database.todos.bulkAdd(todosToImport);
    } catch (error) {
      console.error('Error importing todos:', error);
      if (error.message.includes('JSON')) {
        throw new Error('Invalid JSON file format');
      }
      throw new Error('Failed to import todos: ' + error.message);
    }
  },

  // Check if database is available
  async isDatabaseAvailable() {
    try {
      await initDatabase();
      return true;
    } catch (error) {
      console.error('Database availability check failed:', error);
      return false;
    }
  }
};
