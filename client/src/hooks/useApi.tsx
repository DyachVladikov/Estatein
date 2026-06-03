import { useMutation, useQuery } from "@tanstack/react-query";

import type { Error } from "@/interfaces/interfaces";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error;
  sendData: (
    data: any,
    options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: any) => void;
    },
  ) => void;
  isSending: boolean;
  sendError: any | null;
  resData: { message: string; ok: number } | null;
}

const GET_ROUTES_LIST = [
  "reviews",
  "estates",
  "faqs",
  "employees",
  "clients",
  "properties",
] as const;
type GetRoutes = (typeof GET_ROUTES_LIST)[number];
type PostRoutes = "orders" | "emails";
type Routes = GetRoutes | PostRoutes;

const useApi = <T,>(router: Routes, id?: string): ApiState<T> => {
  const isGetRoute = (GET_ROUTES_LIST as readonly string[]).includes(router);
  const currentRoute = id ? `${router}/${id}` : router;

  // GET запрос
  const query = useQuery({
    queryKey: ["api", currentRoute],
    queryFn: async ({ signal }): Promise<T> => {
      const baseUrl = import.meta.env.VITE_API_URL || "";
      const fullUrl = `${baseUrl}/api/${currentRoute}`.replace(
        /([^:]\/)\/+/g,
        "$1",
      );

      const response = await fetch(fullUrl, { signal });
      const text = await response.text();

      if (!response.ok) {
        console.error(`❌ [useApi] Ошибка HTTP ${response.status}`, text);
        throw new Error(`HTTP ${response.status}`);
      }

      try {
        const data = JSON.parse(text);
        return data;
      } catch (err) {
        throw new Error("Server returned invalid JSON");
      }
    },
    enabled: isGetRoute && !!router,
  });

  // POST мутация (ее тоже немного обезопасим)
  const mutation = useMutation({
    mutationKey: ["api", router],
    mutationFn: async (payload: any) => {
      const baseUrl = import.meta.env.VITE_API_URL || "";
      const fullUrl = `${baseUrl}/api/${router}`.replace(/([^:]\/)\/+/g, "$1");

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      if (!response.ok) {
        console.error(`❌ [useApi POST] Ошибка:`, text);
        throw new Error("Mutation failed");
      }

      return JSON.parse(text);
    },
    onSuccess: () => console.log("✅ Success sent to", router),
    onError: (err) => console.log("❌ Error in", router, err.message),
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

export default useApi;
