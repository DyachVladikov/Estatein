import { useMutation, useQuery } from '@tanstack/react-query';

import type { Error } from '@/interfaces/interfaces';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error,
  sendData: (data: any, options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: any) => void;
    }) => void;
    isSending: boolean;
    sendError: any | null;
}

type Routes = "reviews" | "estates" | "emails" | "faqs" | "employees" | "clients"

const useApi = <T,>(router: Routes) : ApiState<T> => {
  // GET запрос
  const query = useQuery({
    queryKey: ['api', router],
    queryFn: async ({ signal }): Promise<T> => {
      const response = await fetch(`http://localhost:3002/api/${router}`, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    },
    enabled: router != "emails"
  });

  // POST мутация
  const mutation = useMutation({
    mutationKey: ["api", router],
    mutationFn: async (email: string): Promise<any> => {
      const response = await fetch(`http://localhost:3002/api/${router}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      return response.json()
    },
    onSuccess: () => console.log("Succses sent"),
    onError: () => console.log("wrong")
    
    
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error
      ? { HasError: true, status: 500, message: query.error.message }
      : { HasError: false, status: 200, message: "" },
    sendData: mutation.mutate,
    isSending: mutation.isPending,
    sendError: mutation.error,
  };
};

export default useApi

