// app.ts

import HelpDesk from './HelpDesk';
import TicketService from './TicketService';

const root = document.getElementById('root') as HTMLElement;

// Добавим проверку на существование элемента root
if(root) {
  const ticketService = new TicketService();
  const app = new HelpDesk(root, ticketService);
  
  app.init();
} else {
  console.error('root элемент в index.html не найден!');
}
