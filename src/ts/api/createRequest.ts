// createRequest.ts

import { RequestOptions } from "../interface";

const createRequest = async (
  options: RequestOptions = { url: "" },
): Promise<unknown> => {
  // console.log("Параметры, переданные в createRequest:", options);

  const { url, method, params, data } = options;

  const urlWithParams = new URL(url);
  if (params) {
    Object.keys(params).forEach((key) => {
      urlWithParams.searchParams.append(key, params[key] as string);
    });
  }

  // console.log("Сформированный URL:", urlWithParams.href);

  // создадим объект опций для fetch с методом и телом запроса и заголовками
  //  RequestInit - встроенный тип TypeScript, который
  // идеально подходит для описания опций fetch
  // globalThis нужен, чтобы ESLint не выдавал ошибку
  // 24:23  error  'RequestInit' is not defined  no-undef
  const fetchOptions: globalThis.RequestInit = {
    method: method || "GET", // если метод не указан, то по умолчанию GET
  };

  // data используется только для POST-запросов, нам нужно сделать проверку
  if (data) {
    fetchOptions.body = JSON.stringify(data);
    fetchOptions.headers = {
      "Content-Type": "application/json",
    };
  }

  // Отправка запроса и обработка ответа
  try {
    // Составим запрос
    const response = await fetch(urlWithParams.href, fetchOptions);

    if (!response.ok) {
      throw new Error(
        `Произошла ошибка при выполнении запроса: ${response.statusText}`,
      );
    }

    // Обработка ошибки, когда нет тела ответа (например, DELETE-запрос)
    if (response.status === 204) {
      return null;
    }

    // Ну и возвращаем данные в формате JSON
    return await response.json();
  } catch (error) {
    console.error("Произошла ошибка при выполнении запроса:", error);
    throw error;
  }

  // пока вернем пустой объект, чтобы не было ошибок
  // return {};
};

export default createRequest;
