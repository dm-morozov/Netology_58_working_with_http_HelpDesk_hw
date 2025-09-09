// interface.ts

export interface RequestOptions {
  url: string;
  method?: string;
  params?: { [key: string]: any };
  data?: any;
}

export interface TicketData {
  id: string;
  name: string;
  description: string;
  status: boolean;
  created: number;
}