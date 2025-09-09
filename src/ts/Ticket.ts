// Ticket.ts

import { TicketData } from "./interface";

export default class Ticket {
  id: string;
  name: string;
  description: string;
  status: boolean;
  created: number;

  constructor({ id, name, description, status, created }: TicketData) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }
}
