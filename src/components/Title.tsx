import { useRef } from 'react';

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
      <h1 className='text-[clamp(2rem,8vw,5rem)] text-white text-center font-bold [text-shadow:0_0_8px_rgba(255,255,255,0.8),0_0_16px_rgba(100,150,255,0.6)]'>
        오늘의 우주는?
      </h1>
      <button
        onClick={handleClick}
        className='text-white cursor-pointer mt-8 text-[clamp(1rem,2.5vw,1.5rem)] [text-shadow:0_0_8px_rgba(255,255,255,0.8),0_0_16px_rgba(100,150,255,0.6)]'
      >
        시작하기
      </button>
    </div>
  );
};
