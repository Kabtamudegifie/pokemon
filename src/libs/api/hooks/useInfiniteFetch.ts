import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { InfiniteFetchParams, PaginatedResponse } from "../types";
import { fetcher } from "../utils/fetch.util";

export function useInfiniteFetch<TData extends PaginatedResponse<unknown>>(
  key: QueryKey,
  baseUrl: string,
  params?: InfiniteFetchParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      TData,
      Error,
      InfiniteData<TData, number>,
      QueryKey,
      number
    >
  >,
) {
  return useInfiniteQuery({
    ...options,
    queryKey: key,
    queryFn: async ({ pageParam = 0 }): Promise<TData> => {
      const allParams: Record<string, string> = {
        ...Object.fromEntries(
          Object.entries(params || {}).map(([k, v]) => [k, String(v)]),
        ),
        offset: String(pageParam),
      };

      const queryString = new URLSearchParams(allParams).toString();
      return fetcher<TData>(`${baseUrl}?${queryString}`);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: TData) => {
      if (lastPage.next) {
        try {
          const url = new URL(lastPage.next);
          const offset = url.searchParams.get("offset");
          return offset ? Number(offset) : undefined;
        } catch {
          return undefined;
        }
      }
      return undefined;
    },
  });
}
