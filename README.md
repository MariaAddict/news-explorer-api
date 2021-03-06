# news-explorer-api

__________________________

_Проект представляет собой бэкэнд для проекта [news-explorer](https://github.com/MariaAddict/news-explorer-frontend)._
_Реализована авторизация и входпользователя_

### Основные функции  
1. Подключение БД 
2. Созданы модели пользователей и статей.
3. Роуты и контроллеры реализующие получения данных пользователя и статей, создание пользователя, авторизация пользователя, сохранение и удаление статьи.
4. Проверка на авторизацию с помощью мидлвары auth.
5. Централизованная обработка ошибки.
6. Валидация роутеров с помощью библиотек Joi и celebrate. 
7. Сбор логгов ошибок и запросов.
8. Проставление заголовков безопасности с помощью модуля helmet 
9. Разрешение кросс-доменных запросов с помощью cors 
10. Установлен ограничитель скорости выполнения запросов с помощью express-rate-limit 

### Технологии 
Использованы технологии: 
* _JS_ 
* _Node.js_ 
* _express.js_
* _MongoDB - база данных_ 

#### Сcылки на проект и на его сервер:  
[Посмотреть проект](https://news.mortany.ru/ "Добро пожаловать на news-explorer")

[Cервер](https://api.news.mortany.ru/ "Привет, сервак")  
