// useInfiniteFetch.ts
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { fetcher } from "./fetch";

export interface PaginatedResponse<TItem> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TItem[];
}

interface InfiniteFetchParams {
  [key: string]: string | number;
}

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
