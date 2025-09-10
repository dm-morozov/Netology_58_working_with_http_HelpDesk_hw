// HelpDesk.ts

import TicketService from "./TicketService";
import { TicketShortData } from "./interface";

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

    // Мы пока оставим этот вызов, чтобы убедиться, что всё работает
    this.ticketService.list((tickets: TicketShortData[]) => {
      console.log(this.container);
      console.log("Список тикетов получен:", tickets);

      // обязательно очищаем контейнер
      this.container.innerHTML = "";

      // Создаздаем главный список для тикетов
      const ticketsList = document.createElement("div");
      ticketsList.classList.add("tickets-list");

      tickets.forEach((ticket) => {
        console.log(ticket);
        const ticketElement = document.createElement("div");
        ticketElement.classList.add("ticket");

        const ticketStatus = document.createElement("div");
        ticketStatus.classList.add("ticket-status");

        const statusIndicator = document.createElement("span");
        statusIndicator.classList.add("status-indicator");
        statusIndicator.textContent = "✓";

        ticketStatus.append(statusIndicator);
        ticketElement.append(ticketStatus);

        const ticketInfo = document.createElement("div");
        ticketInfo.classList.add("ticket-info");

        const ticketName = document.createElement("span");
        ticketName.classList.add("ticket-name");
        const ticketDate = document.createElement("span");
        ticketDate.classList.add("ticket-date");

        ticketInfo.append(ticketName, ticketDate);
        ticketElement.append(ticketInfo);

        const ticketActions = document.createElement("div");
        ticketActions.classList.add("ticket-actions");

        const editBtn = document.createElement("span");
        editBtn.classList.add("edit-btn");

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("delete-btn");

        ticketActions.append(editBtn, deleteBtn);
        ticketElement.append(ticketActions);
      });
    });
  }
}
