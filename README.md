# Wеb-интерфейс c авторизацией


<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width='30'/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" width='30'/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"  width='30'/> 

## Описание
Wеb-интерфейс c формой авторизацией и возможностью просматривать список `Products`, а также изменять/удалять/добавлять `Product`

Используется [Fake Store API](https://fakestoreapi.com/docs). В связи с этим для авторизации необходимо в поля формы ввести данные пользователей представленных в базе [Fake Store API](https://fakestoreapi.com/users).
Также нужно учитывать валидацию для пароля - должен содержать латиницу, минимум 6 символов, хотя бы 1 спецсимвол (!@#$%^&*), хотя бы 1 цифру, и хотя бы 1 букву в верхнем и нижнем регистре
Пример подходящих данных для авторизации:
- username: `johnd`, password: `m38rmF$`
  
или

- username: `hopkins`, password: `William56$hj`

Полученный token из API записывается в cookie. При отсуствии авторизации - редирект на страницу с формой авторизации.

После входа можно просмотреть список `Products`, более подробную информацию о продукте по нажатию на кнопку `More detail`. Также имеется кнопка `Add Product` c открытием модального окна и формой для добавления продукта.

На странице продукта - можно удалить продукт или изменить его. При изменении появляется модальное окно с формой для реадктировнаия.

Т.к. запросы не внесят изменения в Fake Store API, данные перезаписываются на клиенте. 


## Технологии
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [chakra-ui](https://chakra-ui.com/)
- [Axios](https://axios-http.com/ru/docs/intro)
- [TypeScript](https://www.typescriptlang.org/)
- [Tanstack Query](https://tanstack.com/query/latest)
- [react-hook-form](https://react-hook-form.com/)
- [yup](https://github.com/jquense/yup)
