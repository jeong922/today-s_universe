import { motion } from 'framer-motion';

interface Props {
  onRetry?: () => void;
}

export const Error = ({ onRetry }: Props) => {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white'>
      <motion.div
        className='text-6xl mb-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        💥
      </motion.div>

      <motion.h2
        className='text-2xl font-semibold mb-3'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        💫 Something went wrong
      </motion.h2>

      <p className='text-gray-400 text-sm mb-6 text-center max-w-md'>
        A transmission error occurred while connecting to the NASA data stream. Please check your connection and try
        again.
      </p>

      <motion.button
        onClick={onRetry}
        className='cursor-pointer px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 transition text-white font-medium shadow-lg'
        whileTap={{ scale: 0.95 }}
      >
        Try Again 🚀
      </motion.button>
    </div>
  );
};
