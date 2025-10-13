import { useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export const Title = ({ onStart }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('opacity-0');

      const onTransitionEnd = () => {
        onStart();
        containerRef.current?.removeEventListener('transitionend', onTransitionEnd);
      };

      containerRef.current.addEventListener('transitionend', onTransitionEnd);
    }
  };

  return (
    <div
      ref={containerRef}
      className='absolute w-full h-full flex flex-col items-center justify-center z-10 bg-black/30 transition-opacity duration-500'
    >
      <div
        className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1px)] 
                  bg-[size:3px_3px] opacity-30 animate-[pulse_3s_ease-in-out_infinite] pointer-events-none'
      />

      <motion.h1
        className='relative text-[clamp(2.5rem,8vw,5.5rem)] text-center font-extrabold 
                   text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500
                   drop-shadow-[0_0_25px_rgba(100,150,255,0.8)] select-none'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        Explore Universe
      </motion.h1>

      <motion.p
        className='mt-4 text-gray-300 text-[clamp(1rem,2vw,1.3rem)] tracking-wide font-light select-none'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        Embark on a 5day cosmic journey
      </motion.p>

      <motion.button
        onClick={handleClick}
        className='text-white cursor-pointer mt-8 text-[clamp(1rem,2.5vw,1.5rem)] 
               [text-shadow:0_0_8px_rgba(255,255,255,0.8),0_0_16px_rgba(100,150,255,0.6)]'
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        Start Journey 🚀
      </motion.button>
    </div>
  );
};
