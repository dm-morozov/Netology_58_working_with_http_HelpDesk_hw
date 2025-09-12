// app.ts

import HelpDesk from "./HelpDesk";
import TicketService from "./TicketService";
// import "./test";

const root = document.getElementById("root") as HTMLElement;

// Добавим проверку на существование элемента root
if (root) {
  // Создаем экземпляр TicketService, передавая адрес сервера
  const ticketService = new TicketService(
    "https://helpdesk-server-h222.onrender.com",
  );

  // Создаем экземпляр HelpDesk
  const app = new HelpDesk(root, ticketService);

  app.init();

  // Вызываем list() для проверки
  // ticketService.list(() => {
  //   console.log("Метод list() вызван.");
  // });
} else {
  console.error("root элемент в index.html не найден!");
}
