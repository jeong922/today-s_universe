import { IoCloseSharp } from 'react-icons/io5';
import type { ApodResponse } from '../api/api';

interface Props {
  apodData: ApodResponse;
  onClose: () => void;
}

export const Detail = ({ apodData, onClose }: Props) => {
  const { title, url, explanation, date, media_type } = apodData;

  return (
    <>
      <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-50' onClick={onClose} />

      <div
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      bg-white/10 p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto
                      text-center text-gray-200 z-50'
      >
        <button
          className='absolute top-4 right-4 text-white text-2xl hover:text-gray-300 cursor-pointer'
          onClick={onClose}
        >
          <IoCloseSharp />
        </button>

        <h2 className='text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold mb-2 text-shadow-md'>{title}</h2>
        <p className='text-right text-[clamp(0.8rem,1.2vw,1rem)] mb-4'>{date.replaceAll('-', '.')}</p>

        {media_type === 'image' ? (
          <img className='w-full h-96 max-h-96 object-contain mb-4' loading='lazy' src={url} alt={title} />
        ) : media_type === 'video' ? (
          <div className='w-full aspect-video mb-4'>
            <iframe
              src={url}
              className='w-full h-full'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        ) : null}

        <p className='text-sm text-[clamp(0.9rem,1.4vw,1.1rem)] leading-relaxed'>{explanation}</p>
      </div>
    </>
  );
};
