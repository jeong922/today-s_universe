import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import type { ApodResponse } from '../api/api';

interface Props {
  apodData: ApodResponse;
  onClose: () => void;
}

export const Detail = ({ apodData, onClose }: Props) => {
  const { title, url, explanation, date, media_type } = apodData;

  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <>
      <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm' onClick={onClose} />

      <section className='fixed top-1/2 left-1/2 z-50 h-[90vh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-[#080b14]/95 shadow-2xl'>
        <button
          type='button'
          onClick={onClose}
          aria-label='Close detail modal'
          className='absolute top-4 right-4 z-20 cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xl text-white/70 backdrop-blur-md transition hover:bg-white/10 hover:text-white'
        >
          <IoCloseSharp />
        </button>

        <div className='detail-scroll h-full overflow-y-auto'>
          {media_type === 'image' ? (
            <div className='relative flex h-[420px] w-full shrink-0 items-center justify-center overflow-hidden bg-black sm:h-[480px]'>
              {isImageLoading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-3'>
                    <div className='h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/80' />
                    <span className='text-xs tracking-widest text-white/35 uppercase'>Loading image</span>
                  </div>
                </div>
              )}

              <img
                src={url}
                alt={title}
                loading='lazy'
                decoding='async'
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
                className={`h-full w-full object-contain transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              />

              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080b14] to-transparent' />
            </div>
          ) : media_type === 'video' ? (
            <div className='aspect-video w-full shrink-0 bg-black'>
              <iframe
                src={url}
                title={title}
                className='h-full w-full'
                loading='lazy'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          ) : null}

          <div className='px-6 pt-5 pb-10 sm:px-8'>
            <div className='mb-6 flex flex-col gap-2 pr-10'>
              <span className='text-xs font-medium tracking-[0.2em] text-violet-300/70 uppercase'>
                Astronomy Picture of the Day
              </span>

              <h2 className='text-2xl leading-tight font-semibold text-white sm:text-3xl'>{title}</h2>

              <time className='text-sm text-white/40'>{date.replaceAll('-', '.')}</time>
            </div>

            <div className='h-px w-full bg-white/10' />

            <p className='mt-6 text-sm leading-7 text-white/70 sm:text-[0.95rem] sm:leading-8'>{explanation}</p>
          </div>
        </div>
      </section>
    </>
  );
};
