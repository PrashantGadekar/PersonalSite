import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  
  // Generate random floating balls (consistent with login page)
  const FloatingBalls = () => {
    const balls = [];
    for (let i = 0; i < 15; i++) {
      const colors = ['#ffffff', '#93c5fd', '#c4b5fd', '#86efac'];
      balls.push(
        <motion.div
          key={i}
          className="dashboard-floating-ball"
          style={{
            width: Math.random() * 10 + 4 + 'px',
            height: Math.random() * 10 + 4 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            backgroundColor: colors[i % 4],
          }}
          animate={{
            x: [0, Math.random() * 150 - 75, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 150 - 75, Math.random() * 150 - 75, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        />
      );
    }
    return balls;
  };

  const tiles = [
    {
      id: 'finance',
      title: 'Finance',
      icon: (
        <svg className="tile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      className: 'tile-finance'
    },
    {
      id: 'todo',
      title: 'To-Do List',
      icon: (
        <svg className="tile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      className: 'tile-todo'
    },
    {
      id: 'goals',
      title: 'Goals',
      icon: (
        <svg className="tile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      className: 'tile-goals'
    }
  ];

  const handleTileClick = (tileId) => {
    console.log(`Clicked on ${tileId} tile`);
    // Navigate to different pages based on tile
    if (tileId === 'todo') {
      navigate('/todo');
    } else if (tileId === 'finance') {
      console.log('Finance feature coming soon!');
    } else if (tileId === 'goals') {
      console.log('Goals feature coming soon!');
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="dashboard-container">
      {/* Floating balls background */}
      <div className="dashboard-floating-balls">
        <FloatingBalls />
      </div>

      {/* Logout button */}
      <div className="logout-section">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="dashboard-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="dashboard-header"
        >
          <h1 className="dashboard-title">
            Welcome back, {user?.username || 'User'}!
          </h1>
          <p className="dashboard-subtitle">
            What would you like to work on today?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="dashboard-grid"
        >
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`dashboard-tile ${tile.className}`}
              onClick={() => handleTileClick(tile.id)}
            >
              {tile.icon}
              <div>
                <h3 className="tile-title">{tile.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
