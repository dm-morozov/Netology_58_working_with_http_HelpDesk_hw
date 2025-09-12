// HelpDesk.ts

import TicketService from "./TicketService";
import { TicketShortData } from "./interface";

// Основной класс приложения

export default class HelpDesk {
  container: HTMLElement;
  ticketService: TicketService;
  private preloader: HTMLElement | null = null;

  // Модальное окно добавления/редактирования
  private modalAddEdit: HTMLElement | null = null;
  private closeBtnAddEdit: HTMLElement | null = null;
  private cancelBtnAddEdit: HTMLElement | null = null;
  private modalFormAddEdit: HTMLFormElement | null = null;
  private modalTitleAddEdit: HTMLElement | null = null;
  private nameInputAddEdit: HTMLInputElement | null = null;
  private descriptionTextareaAddEdit: HTMLTextAreaElement | null = null;
  private addTicketBtn: HTMLElement | null = null;

  // Модальное окно удаления
  private modalDelete: HTMLElement | null = null;
  private deleteBtnModal: HTMLElement | null = null;
  private cancelBtnDelete: HTMLElement | null = null;
  private closeBtnDelete: HTMLElement | null = null;
  private deleteTicketName: HTMLElement | null = null;

  // Временное хранилище для ID тикета, который нужно удалить
  private currentTicketId: string | null = null;

  constructor(container: HTMLElement, ticketService: TicketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;

    // Решил сделать специально для бесплатного сервера.
    // Так как его загрузка занимает около 50 секунд
    this.preloader = document.querySelector(".preloader");

    // инициализируем кнопочки
    this.addTicketBtn = document.querySelector(".add-ticket-btn");

    // Инициализируем элементы для модального окна добавления/редактирования
    this.modalAddEdit = document.querySelector(".modal-add-edit");
    if (this.modalAddEdit) {
      this.modalFormAddEdit = this.modalAddEdit.querySelector(
        ".modal-form",
      ) as HTMLFormElement;
      this.closeBtnAddEdit = this.modalAddEdit.querySelector(".close-btn");
      this.cancelBtnAddEdit = this.modalAddEdit.querySelector(".cancel-btn");
      this.modalTitleAddEdit = this.modalAddEdit.querySelector(".modal-title");
      this.nameInputAddEdit = this.modalAddEdit.querySelector(
        "#name",
      ) as HTMLInputElement;
      this.descriptionTextareaAddEdit = this.modalAddEdit.querySelector(
        "#description",
      ) as HTMLTextAreaElement;
    }

    // Инициализируем элементы для модального окна удаления
    this.modalDelete = document.querySelector(".modal-delete");
    if (this.modalDelete) {
      this.deleteBtnModal = this.modalDelete.querySelector(".delete-btn-modal");
      this.cancelBtnDelete =
        this.modalDelete.querySelector(".cancel-btn-delete");
      this.closeBtnDelete = this.modalDelete.querySelector(".close-btn-delete");
      this.deleteTicketName = this.modalDelete.querySelector(
        ".delete-ticket-name",
      );
    }

    // Инициализируем обработчики
    this.initEventListeners();
  }

  init(): void {
    console.info("init");

    // Показываем прелоадер перед запросом
    this.showPreloader();

    // Уберем отсюда initEventListeners(),
    // так как теперь он в конструкторе
    // this.initEventListeners();
    // происходило дублировании при переинициализации
    // например когда создавал новый тикет

    // Мы пока оставим этот вызов, чтобы убедиться, что всё работает
    this.ticketService.list((tickets: TicketShortData[]) => {
      this.renderTicketList(tickets);

      // Скрываем прелоадер после получения данных
      this.hidePreloader();
    });
  }

  // метод для показа прелоадера
  private showPreloader(): void {
    this.preloader?.classList.remove("hidden");
  }

  // метод для скрытия прелоадера
  private hidePreloader(): void {
    this.preloader?.classList.add("hidden");
  }

  private renderTicketList(tickets: TicketShortData[]): void {
    console.log(this.container);
    console.log("Список тикетов получен:", tickets);

    // обязательно очищаем контейнер
    this.container.innerHTML = "";

    // Создаем главный список для тикетов
    const ticketsList = document.createElement("div");
    ticketsList.classList.add("tickets-list");

    tickets.forEach((ticket) => {
      console.log(ticket);
      const ticketElement = document.createElement("div");
      ticketElement.classList.add("ticket");
      ticketElement.dataset.id = ticket.id;

      // Создаем новый контейнер для шапки тикета
      const ticketHeader = document.createElement("div");
      ticketHeader.classList.add("ticket-header");

      const ticketStatus = document.createElement("div");
      ticketStatus.classList.add("ticket-status");
      const statusIndicator = document.createElement("input");
      statusIndicator.type = "checkbox";
      statusIndicator.checked = ticket.status;
      statusIndicator.classList.add("status-indicator");
      ticketStatus.append(statusIndicator);

      // Обработчик для изменения статуса
      statusIndicator.addEventListener("change", () => {
        const newStatus = statusIndicator.checked;
        this.ticketService.update(ticket.id, { status: newStatus }, () => {
          console.log(`Статус тикета ${ticket.id} обновлен на ${newStatus}`);
        });
      });

      // Добавляем обработчик dblclick для галочки,
      // чтобы остановить всплытие
      statusIndicator.addEventListener("click", (event) => {
        event.stopPropagation(); // Останавливаем всплытие события
      });

      const ticketInfo = document.createElement("div");
      ticketInfo.classList.add("ticket-info");
      const ticketName = document.createElement("span");
      ticketName.classList.add("ticket-name");
      ticketName.textContent = ticket.name;
      const ticketDate = document.createElement("span");
      ticketDate.classList.add("ticket-date");
      // Выводим дату в формате: 01.01.2025 12:00
      ticketDate.textContent = new Date(ticket.created).toLocaleString(
        "ru-RU",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      );
      ticketInfo.append(ticketName, ticketDate);

      const ticketActions = document.createElement("div");
      ticketActions.classList.add("ticket-actions");
      const editBtn = document.createElement("button");
      editBtn.classList.add("edit-btn");
      editBtn.textContent = "✎";
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "✖";
      ticketActions.append(editBtn, deleteBtn);

      // Элемент для полного описания при двойном нажатии
      const ticketDescription = document.createElement("p");
      ticketDescription.classList.add("ticket-description");

      // Обработчики событий добавляем после того, как все элементы созданы
      // Добавляем обработчик для кнопки редактирования
      editBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // отменяем всплытие события

        this.ticketService.get(ticket.id, (fullTicket) => {
          // в списке тикетов (TicketShortData) у нас нет полного описания, как по заданию
          // по этому мы отдельно получаем полное описание тикета по его id
          // обращаясь к серверу
          // Когда данные получены, вызываем метод для показа модалки
          this.showAddEditModal(
            fullTicket?.id,
            fullTicket?.name,
            fullTicket?.description,
          );
        });
      });

      // Добавляем обработчик для кнопки удаления
      deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // отменяем всплытие события
        this.showDeleteModal(ticket.id, ticket.name);
      });

      // обработчик клика на сам тикет
      // Теперь он может обращаться к ticketDescription, так как тот уже создан
      ticketElement.addEventListener("click", () => {
        // Если описание тикета видно, скрываем его
        if (ticketDescription.classList.contains("visible")) {
          ticketDescription.classList.remove("visible");
          ticketDescription.textContent = "";
        } else {
          // Если нет, то получаем полное описание с сервера
          this.ticketService.get(ticket.id, (fullTicket) => {
            if (fullTicket) {
              // Проверяем, есть ли описание у тикета
              if (fullTicket.description.trim() === "") {
                ticketDescription.textContent =
                  "Нажмите на кнопку редактирования ✎ , чтобы добавить описание.";
                ticketDescription.classList.add("empty-description");
              } else {
                ticketDescription.textContent = fullTicket.description;
                ticketDescription.classList.remove("empty-description");
              }
              ticketDescription.classList.add("visible");
            }
          });
        }
      });

      // Собираем шапку в один контейнер
      ticketHeader.append(ticketStatus, ticketInfo, ticketActions);

      // Собираем все элементы в правильном порядке
      ticketElement.append(ticketHeader, ticketDescription);

      ticketsList.append(ticketElement);
    });

    this.container.append(ticketsList);
  }

  // Общие методы для показа/скрытия модальных окон
  private showModal(modalElement: HTMLElement | null): void {
    modalElement?.classList.remove("hidden");
  }

  private hideModal(modalElement: HTMLElement | null): void {
    modalElement?.classList.add("hidden");
  }

  // Метод для отображения модального окна "Добавить тикет"
  private showAddEditModal(
    id: string | null = null,
    name: string = "",
    description: string = "",
  ): void {
    if (this.modalTitleAddEdit)
      // проверим есть ли id, если есть, значит мы редактируем тикет
      this.modalTitleAddEdit.textContent = id
        ? "Редактировать тикет"
        : "Добавить тикет";

    if (this.nameInputAddEdit) this.nameInputAddEdit.value = name;

    if (this.descriptionTextareaAddEdit)
      this.descriptionTextareaAddEdit.value = description;

    // Сохраняем id тикета для последующей отправки
    this.currentTicketId = id;

    this.showModal(this.modalAddEdit);
  }

  // Метод для отображения модального окна "Удалить тикет"
  private showDeleteModal(id: string, name: string): void {
    this.currentTicketId = id;
    if (this.deleteTicketName) this.deleteTicketName.textContent = `"${name}"`;
    this.showModal(this.modalDelete);
  }

  private initEventListeners(): void {
    // Обработчики для модального окна добавления/редактирования
    this.addTicketBtn?.addEventListener("click", () => {
      // Сбрасываем id, чтобы модалка работала в режиме добавления
      this.currentTicketId = null;
      this.showAddEditModal();
    });

    this.closeBtnAddEdit?.addEventListener("click", () =>
      this.hideModal(this.modalAddEdit),
    );
    this.cancelBtnAddEdit?.addEventListener("click", () =>
      this.hideModal(this.modalAddEdit),
    );
    this.modalFormAddEdit?.addEventListener("submit", (e) =>
      this.handleFormSubmitAddEdit(e),
    );

    // Обработчики для модального окна удаления
    this.closeBtnDelete?.addEventListener("click", () =>
      this.hideModal(this.modalDelete),
    );
    this.cancelBtnDelete?.addEventListener("click", () =>
      this.hideModal(this.modalDelete),
    );
    this.deleteBtnModal?.addEventListener("click", () =>
      this.handleDeleteSubmit(),
    );
  }

  private handleFormSubmitAddEdit(e: Event): void {
    e.preventDefault();
    if (this.nameInputAddEdit && this.descriptionTextareaAddEdit) {
      const data = {
        name: this.nameInputAddEdit.value,
        description: this.descriptionTextareaAddEdit.value,
        status: false,
      };

      if (this.currentTicketId) {
        this.ticketService.update(this.currentTicketId, data, () => {
          this.hideModal(this.modalAddEdit);
          // this.init();
          // Просто обновляем список, не вызывая init()
          this.ticketService.list((tickets) => this.renderTicketList(tickets));
        });
      } else {
        this.ticketService.create(data, () => {
          this.hideModal(this.modalAddEdit);
          // this.init();
          // Просто обновляем список, не вызывая init()
          this.ticketService.list((tickets) => this.renderTicketList(tickets));
        });
      }
    }
  }

  private handleDeleteSubmit(): void {
    if (this.currentTicketId) {
      this.ticketService.delete(this.currentTicketId, () => {
        this.hideModal(this.modalDelete);
        // this.init();
        // Просто обновляем список, не вызывая init()
        this.ticketService.list((tickets) => this.renderTicketList(tickets));
      });
    }
  }
}
