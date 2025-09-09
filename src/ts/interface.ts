// interface.ts

export interface RequestOptions {
  url: string;
  method?: string;
  params?: { [key: string]: any };
  data?: any;
}