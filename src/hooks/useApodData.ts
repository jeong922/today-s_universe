import { useQuery } from '@tanstack/react-query';
import type { ApodResponse } from '../api/api';
import APOD from '../api/api';

export const useApodData = (count: number = 5) => {
  const { data, error, isLoading, isError } = useQuery<ApodResponse[]>({
    queryKey: ['apodData', count],
    queryFn: async ({ queryKey }) => {
      const [, count] = queryKey;
      return await APOD(count as number);
    },
  });

  return { data: data || [], error, isLoading, isError };
};
