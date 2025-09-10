// test.ts

import TicketService from './TicketService';
import { TicketData } from './interface';

const service = new TicketService('http://localhost:7070');
const dummyTicket = {
  name: 'Тестовый тикет',
  description: 'Описание тестового тикета',
  status: true,
};
let createdTicketId: string;

// Тест 1: list() - Получение всех тикетов
console.log('Тестирование метода list()...');
service.list((tickets) => {
  console.log('Получен список тикетов:', tickets);
});

// Тест 2: create() - Создание нового тикета
console.log('Тестирование метода create()...');
service.create(dummyTicket, (ticket: TicketData) => {
  console.log('Создан новый тикет:', ticket);
  createdTicketId = ticket.id;

  // Тест 3: get() - Получение конкретного тикета
  console.log('Тестирование метода get()...');
  service.get(createdTicketId, (foundTicket) => {
    console.log('Найден тикет:', foundTicket);

    // Тест 4: update() - Обновление тикета
    console.log('Тестирование метода update()...');
    service.update(createdTicketId, { name: 'Обновленный тикет' }, (updatedTickets) => {
      console.log('Обновлен тикет, получен новый список:', updatedTickets);

      // Тест 5: delete() - Удаление тикета
      console.log('Тестирование метода delete()...');
      service.delete(createdTicketId, () => {
        console.log('Тикет успешно удален.');
      });
    });
  });
});