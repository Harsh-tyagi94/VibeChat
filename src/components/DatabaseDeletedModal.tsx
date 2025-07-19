'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function DatabaseDeletedModal() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4 relative">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-800" size={20} />}
        </button>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                Database Deleted
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                Free databases are deleted by automation after 14 days of inactivity.
              </p>

              <div className="space-y-5">
                {/* Restore Database Box */}
                <div className="rounded-xl border border-green-300 bg-green-50 dark:bg-green-900 dark:border-green-700 p-4 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Restore the Database
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Restoring will recover the database from backups, allowing normal operations to resume.
                  </p>
                  <p className="text-sm font-medium text-orange-500">
                    Ensure the target database is created beforehand to load the restored data.
                  </p>
                  <button className="mt-3 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300">
                    Restore
                  </button>
                </div>

                {/* Delete Database Box */}
                <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-900 dark:border-red-700 p-4 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Delete the Database
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    This action is irreversible, so confirm that the data is no longer needed before proceeding.
                  </p>
                  <button className="mt-2 w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300">
                    {`I'm sure, delete my database`}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
