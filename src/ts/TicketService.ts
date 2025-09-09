// TicketService.ts

import { TicketData } from "./interface";

// Создаем новый тип для "короткого" тикета, исключая description
export type TicketShortData = Omit<TicketData, 'description'>;

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  
  // list возвращает список всех тикетов
  // list: ожидает функцию-callback, которая принимает массив объектов TicketData
  list(callback: (data: TicketShortData[]) => void): void {}

  // Метод получает полное описание одного конкретного тикета
  get(id: string, callback: (data: TicketData | null) => void): void {}

  // Метод создания нового тикета
  // Omit<TicketData, 'id' | 'created'> означает, 
  // что мы создаём тип, который похож на TicketData, 
  // но без полей id и created. Это идеально подходит 
  // для метода create, потому что при создании нового 
  // тикета мы не знаем его id (его сгенерирует сервер) 
  // и created (его тоже установит сервер).
  create(data: Omit<TicketData, 'id' | 'created'>, callback: (data: TicketData) => void): void {}

  // Метод частичного обновления тикета
  // Partial<Type>: Создаёт новый тип, в котором все свойства Type 
  // становятся необязательными (optional)
  update(id: string, data: Partial<TicketData>, callback: (data: TicketData[]) => void): void {}

  delete(id: string, callback: () => void): void {}
}
