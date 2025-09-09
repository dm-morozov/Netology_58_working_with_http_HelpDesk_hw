// interface.ts

export interface Ticket {
  id: number;
  name: string;
  description: string;
  status: string;
  created: string;
}

export interface RequestOptions {
  url: string;
  method?: string;
  params?: { [key: string]: any };
  data?: any;
}