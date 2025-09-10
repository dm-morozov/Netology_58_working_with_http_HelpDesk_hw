// interface.ts

export interface RequestOptions {
  url: string;
  method?: string;
  params?: { [key: string]: unknown }; // для передачи query-параметров ?method=ticketById&id=<id> -> params: { method: 'ticketById', id: '<id>' }
  data?: unknown; // для передачи тела запроса для POST
}

export interface TicketData {
  id: string;
  name: string;
  description: string;
  status: boolean;
  created: number;
}

// Создаем новый тип для "короткого" тикета, исключая description
export type TicketShortData = Omit<TicketData, "description">;
