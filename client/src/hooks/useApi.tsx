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
  resData: {message: string, ok: number} | null,
}

const GET_ROUTES_LIST = ["reviews", "estates", "faqs", "employees", "clients"] as const;
type GetRoutes = typeof GET_ROUTES_LIST[number];
type PostRoutes = "orders" | "emails";
type Routes = GetRoutes | PostRoutes;

const useApi = <T,>(router: Routes) : ApiState<T> => {
  const isGetRoute = (GET_ROUTES_LIST as readonly string[]).includes(router);
  // GET запрос
  const query = useQuery({
    queryKey: ['api', router],
    queryFn: async ({ signal }): Promise<T> => {
      const response = await fetch(`http://localhost:3002/api/${router}`, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    },
    enabled: isGetRoute && !!router,
  });

  // POST мутация
  const mutation = useMutation({
    mutationKey: ["api", router],
    mutationFn: async (payload: any) => {
      const response = await fetch(`http://localhost:3002/api/${router}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Mutation failed');
      
      return result;
    },
    onSuccess: () => console.log("Success sent to", router),
    onError: (err) => console.log("Error in", router, err.message)
    
    
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error
      ? { HasError: true, status: 500, message: query.error.message }
      : { HasError: false, status: 200, message: "" },
    resData: mutation.data ?? null,
    sendData: mutation.mutate,
    isSending: mutation.isPending,
    sendError: mutation.error,
  };
};

export default useApi

