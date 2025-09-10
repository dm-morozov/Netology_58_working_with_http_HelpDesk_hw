# Работа с HTTP

---

### Статус проекта
[![Build status](https://ci.appveyor.com/api/projects/status/2fgcnwob534ytjlu?svg=true)](https://ci.appveyor.com/project/dm-morozov/netology-58-working-with-http-helpdesk-hw)
![CI](https://github.com/dm-morozov/Netology_58_working_with_http_HelpDesk_hw/actions/workflows/web.yaml/badge.svg)
![Netology](https://img.shields.io/badge/FrontendTS-BackendNodeJS-blue)

[**Ссылка на проект на GitHub Pages**](https://dm-morozov.github.io/Netology_57_working_with_http/)

---

Мой ход мыслей
Когда я думаю о задаче "написать фронтенд для HelpDesk", я сначала разбиваю её на части:

Как я буду общаться с сервером? — Мне нужен модуль для запросов. У меня есть 5 разных методов API, которые нужно вызвать. Чтобы не дублировать код, я создам одну универсальную функцию, которая будет работать со всеми из них. Это и есть createRequest.ts.

Как я буду управлять данными? — Мне нужен сервис, который будет "знать" о тикетах. Он будет вызывать мою функцию для запросов и предоставлять удобные методы (.list(), .create()) для остальной части приложения. Это TicketService.ts.

Как я буду отображать данные? — Мне нужен класс для отрисовки тикетов. Это TicketView.ts.

Как я буду собирать данные от пользователя? — Мне нужен класс для модальных окон. Это TicketForm.ts.

Как всё это будет работать вместе? — Мне нужен главный класс, который будет управлять всеми остальными. Это HelpDesk.ts.

---

## 📧 Контакты

Если возникнут вопросы, пишите:

* ![LinkedIn](./svg/linkedin-icon.svg) [LinkedIn](https://www.linkedin.com/in/dm-morozov/)
* ![Telegram](./svg/telegram.svg) [Telegram](https://t.me/dem2014)
* ![GitHub](./svg/github-icon.svg) [GitHub](https://github.com/dm-morozov/)

---