export type PageApiResponse<T> = {
  list: T[];
  lastOffset: number;
  hasNext: boolean;
};
