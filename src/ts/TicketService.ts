// TicketService.ts

import createRequest from "./api/createRequest";
import { TicketData, TicketShortData } from "./interface";

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  private url: string; // Свойство для хранения url-адреса сервера

  constructor(url: string) {
    this.url = url;
  }

  // list возвращает список всех тикетов
  // list: ожидает функцию-callback, которая принимает массив объектов TicketData
  list(callback: (data: TicketShortData[]) => void): void {
    // Вызываем createRequest с нужными параметрами
    createRequest({
      url: this.url,
      method: "GET",
      params: {
        method: "allTickets",
      },
    })
      .then((data) => callback(data)) // Когда данные получены, вызываем callback
      .catch((error) => {
        console.error("Произошла ошибка при получении списка тикетов:", error);
      });
  }

  // Метод получает полное описание одного конкретного тикета
  get(id: string, callback: (data: TicketData | null) => void): void {
    createRequest({
      url: this.url,
      method: "GET",
      params: {
        method: "ticketById",
        id: id,
      },
    })
      .then((data) => callback(data))
      .catch((error) => {
        console.error("Произошла ошибка при получении тикета:", error);
        callback(null); // Если произошла ошибка, возвращаем null
      });
  }

  // Метод создания нового тикета
  // Omit<TicketData, 'id' | 'created'> означает,
  // что мы создаём тип, который похож на TicketData,
  // но без полей id и created. Это идеально подходит
  // для метода create, потому что при создании нового
  // тикета мы не знаем его id (его сгенерирует сервер)
  // и created (его тоже установит сервер).
  create(
    data: Omit<TicketData, "id" | "created">,
    callback: (data: TicketData) => void,
  ): void {
    createRequest({
      url: this.url,
      method: "POST",
      params: {
        method: "createTicket",
      },
      // POST   ?method=createTicket - создание тикета
      // (<id> генерируется на сервере,
      // в теле формы name, description, status)
      data: data, // данные для создания тикета такие как имя, описание и статус по заданию
    })
      .then((data) => callback(data))
      .catch((error) => {
        console.error("Произошла ошибка при создании тикета:", error);
      });
  }

  // Метод частичного обновления тикета
  // Partial<Type>: Создаёт новый тип, в котором все свойства Type
  // становятся необязательными (optional)
  update(
    id: string,
    data: Partial<TicketData>,
    callback: (data: TicketData[]) => void,
  ): void {
    createRequest({
      url: this.url,
      method: "POST",
      params: {
        method: "updateById",
        id: id,
      },
      data: data,
    })
      .then((data) => callback(data))
      .catch((error) => {
        console.error("Произошла ошибка при создании тикета:", error);
      });
  }

  delete(id: string, callback: () => void): void {
    createRequest({
      url: this.url,
      method: "GET",
      params: {
        method: "deleteById",
        id: id,
      },
    })
      .then(() => callback())
      .catch((error) => {
        console.error("Произошла ошибка при создании тикета:", error);
      });
  }
}
