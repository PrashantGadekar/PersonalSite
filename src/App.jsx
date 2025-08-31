import { useState } from 'react'
import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import { motion } from 'framer-motion';

function App() {
  const [count, setCount] = useState(0)

  // Animation imports
  

  // File System Access API handler
  const handleFolderAccess = async () => {
    if ('showDirectoryPicker' in window) {
      try {
        const dirHandle = await window.showDirectoryPicker();
        alert('Folder access granted!');
        // You can now read/write files in dirHandle
      } catch (err) {
        alert('Folder access denied or cancelled.');
      }
    } else {
      alert('File System Access API not supported on this browser.');
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 flex flex-col items-center justify-center text-white">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="mb-8">
          <img src={reactLogo} className="w-24 h-24 mx-auto animate-spin" alt="React logo" />
          <h1 className="text-5xl font-extrabold mt-4">Personal PWA Site</h1>
        </motion.div>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="card bg-white bg-opacity-10 p-8 rounded-xl shadow-xl">
          <button onClick={() => setCount((count) => count + 1)} className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform">
            Count is {count}
          </button>
          <button onClick={handleFolderAccess} className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform">
            Access Mobile Folder
          </button>
          <p className="mt-4 text-lg">Interact with your mobile folders using the File System Access API.</p>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-8 text-lg">
          Beautiful styles and smooth animations powered by Tailwind CSS & Framer Motion.
        </motion.p>
      </div>
  )
}

export default App
