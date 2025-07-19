'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import { Sun, Moon, LogIn } from 'lucide-react'
import { useTheme } from '@/components/ThemeContext'

const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast.error('Something went wrong with login')
    } finally {
      setIsLoading(false)
    }
  }

  const darkMode = theme === "dark"

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        darkMode
          ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-black'
          : 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/20 dark:bg-black/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl flex flex-col items-center max-w-md w-[90%] sm:w-full space-y-6 transition-all duration-300"
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 transition"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <Sun className="text-yellow-400 h-5 w-5" />
          ) : (
            <Moon className="text-blue-600 h-5 w-5" />
          )}
        </button>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-white dark:text-yellow-200 drop-shadow-md tracking-wide"
        >
          Vibe<span className="text-yellow-300">Chat</span>
        </motion.div>

        <h2 className="text-white dark:text-white text-2xl sm:text-3xl font-semibold text-center transition-all">
          Sign in to your account
        </h2>

        <Button
          isLoading={isLoading}
          type="button"
          className="flex items-center justify-center gap-2 bg-white text-black dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 font-semibold py-2 px-4 rounded-lg shadow-md w-full"
          onClick={loginWithGoogle}
        >
          {!isLoading && (
            <LogIn className="h-5 w-5 text-blue-600 dark:text-white" />
          )}
          Continue with Google
        </Button>

        <p className="text-sm text-white/80 dark:text-white/50 text-center">
          Don’t have an account? Just sign in to create one.
        </p>
      </motion.div>
    </div>
  )
}

export default Page
