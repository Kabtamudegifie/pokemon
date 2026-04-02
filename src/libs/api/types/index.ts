export interface PaginatedResponse<TItem> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TItem[];
}

export interface InfiniteFetchParams {
  [key: string]: string | number;
}
