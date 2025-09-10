// HelpDesk.ts

import TicketService from "./TicketService";

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  container: HTMLElement;
  ticketService: TicketService;

  constructor(container: HTMLElement, ticketService: TicketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init(): void {
    console.info("init");
  }
}
