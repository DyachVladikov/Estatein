import { useQuery } from '@tanstack/react-query';

import type { Error } from '@/interfaces/interfaces';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error,
}

type Routes = "reviews" | "estates" | "emails" | "faqs" | "employees" | "clients"

const useApi = <T,>(router: Routes): ApiState<T> => {
  const query = useQuery({
    queryKey: ['api', router],  
    queryFn: async (): Promise<T> => {
      const response = await fetch(`http://localhost:3002/api/${router}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`); 
      }
      return response.json();
    },
  });
  
  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error 
      ? { 
          HasError: true, 
          status: 500, 
          message: query.error.message 
        }
      : { HasError: false, status: 200, message: "" }, 
  };
};

export default useApi;
