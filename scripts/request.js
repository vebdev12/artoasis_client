// const BASE_URL = "https://artoasis-server.onrender.com/api";
const BASE_URL = "http://localhost:8080/api";

const defaultHeaders = {
  "Content-type": "application/json",
  Accept: "application/json",
};

const request = async (
  url,
  method = "GET",
  body = null,
  headers = defaultHeaders
) => {
  const token = localStorage.getItem("ArtOasis-token");

  // Заголовки, которые будут отправлены. Изначально - дефолтные
  let requestHeaders = { ...headers };

  // Если есть токен, добавляем заголовок Authorization
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  // Определяем, нужно ли сериализовывать тело запроса в JSON
  let requestBody = body;
  if (body && !(body instanceof FormData)) {
    // Проверяем, что body - не FormData
    requestBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      body: requestBody,
      headers: requestHeaders,
    });

    if (!response.ok) {
      // Попробуем получить текст ошибки с сервера (полезно для отладки)
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (textError) {
        errorText = `Ошибка при чтении текста ошибки: ${textError.message}`;
      }
      throw new Error(
        `could not fetch ${url}, status ${response.status}. ${errorText}`
      );
    }

    // Проверяем Content-Type ответа, чтобы правильно распарсить
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // Если не JSON, возвращаем текст (например, HTML, XML)
      return await response.text();
    }
  } catch (e) {
    console.error("Request error:", e); // Логируем ошибку для отладки
    throw e;
  }
};
