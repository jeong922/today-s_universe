import { useState } from 'react';
import { Title } from './components/Title';
import { Universe } from './components/Universe';
import APOD, { type ApodResponse } from './api/api';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [visible, setVisible] = useState(true);

  const {
    data: apodData,
    error,
    isLoading,
    isError,
  } = useQuery<ApodResponse[]>({
    queryKey: ['apodData', 5],
    queryFn: async ({ queryKey }) => {
      const [, count] = queryKey;
      return await APOD(count as number);
    },
  });

  const handleStart = () => {
    setVisible(false);
  };

  if (isLoading) return <p>loading...</p>;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div className='bg-black w-full min-h-screen'>
      {visible && <Title onStart={handleStart} />}
      <div className='w-full h-screen'>
        <Universe data={apodData || []} />
      </div>
    </div>
  );
}

export default App;
