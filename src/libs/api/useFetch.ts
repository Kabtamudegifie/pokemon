import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetcher } from "./fetch";

export function useFetch<TData>(
  key: QueryKey,
  baseUrl: string,
  params?: Record<string, string | number>,
  options?: Partial<UseQueryOptions<TData, Error, TData, QueryKey>>,
) {
  return useQuery({
    ...options,
    queryKey: key,
    queryFn: async (): Promise<TData> => {
      const queryString = params
        ? "?" +
          new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)]),
          ).toString()
        : "";

      return fetcher<TData>(`${baseUrl}${queryString}`);
    },
  });
}
