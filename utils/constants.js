const regexImage = /^(https?:\/\/)?[^\s]*\.(?:jpe?g|png|gif|test|bmp|pdf|svg)$/;
const regexVideo = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const STATUS_CREATED = 201;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;
const UNIQUE_ERROR = 11000;

const BAD_REQUEST_ERROR_MESSAGE = 'Переданы некорректные данные';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const FORBIDDEN_ERROR_MESSAGE = 'Нет прав на удаление фильма';
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемые данные не найдены';
const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким  email уже существует';
const AUTH_ERROR_MESSAGE = 'Неправильные почта или пароль';

module.exports = {
  STATUS_CREATED,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  UNIQUE_ERROR,
  BAD_REQUEST_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  regexImage,
  regexVideo,
};
