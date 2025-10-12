import { motion } from 'framer-motion';

export const Loading = () => {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/70'>
      <motion.div
        className='text-4xl mb-4'
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🚀
      </motion.div>

      <motion.div
        className='text-2xl tracking-widest font-light text-white'
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Generating your universe...
      </motion.div>

      <motion.div
        className='mt-6 text-sm text-gray-300'
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        Please stand by as the cosmos align ✨
      </motion.div>
    </div>
  );
};
