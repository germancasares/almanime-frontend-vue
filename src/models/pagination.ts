export interface Pagination {
  current: number;
  isLoading: boolean;
  pageSize: number;
}

export interface PaginationMeta {
  count: number;
  first: URL;
  previous: URL | null;
  next: URL | null;
  last: URL;
}

export interface ModelWithMeta<T> {
  meta: PaginationMeta;
  models: T;
}
