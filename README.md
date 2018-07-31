# [RC-oc](https://github.com/redclick-eu/Opencart-start-theme)

RC-oc стартовая тема для opencart

## Основные технологии

| Технологии    | Проверка | Установка
| --------------- | ------------ | ------------- |
| PHP >= 5.4.x    | `php -v`     | [php.net](http://php.net/manual/en/install.php) |
| Node.js >= 4.5  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.8.10  | `gulp -v`    | `npm install -g gulp` |
| Bower >= 1.3.12 | `bower -v`   | `npm install -g bower` |

Для получения большего количества информации об установке перейдите к секции [Установка gulp и bower](#install-gulp-and-bower)

## Дополнительные технологии

* [gulp](http://gulpjs.com/) скрипт сборки, который компилирует как Sass, так и Less, проверяет ошибки JavaScript, оптимизирует изображения и объединяет и минимизирует файлы
* [BrowserSync](http://www.browsersync.io/) для обеспечения синхронизации нескольких браузеров и устройств во время тестирования, а также подключения обновленных CSS и JS в ваш браузер, во время разработки
* [Bower](http://bower.io/) для управления front-end зависимостями 
* [asset-builder](https://github.com/austinpray/asset-builder) для настройки проекта через manifest.json
* [Bootstrap](http://getbootstrap.com/)

## Установка темы

Скропируйте RC-oc в корень сайта с заменой файлов

## Настройка темы

Редактируйте `lib/setup.php` для включения/выключения функциональности сайта, настраивайте меню, миниатюры постов и страниц, форматы постов, и сайдбары.

## Разработка темы

RC-oc использует [gulp](http://gulpjs.com/) для управления сборкой проекта и [Bower](http://bower.io/) для управления front-end зависимостями

### Установка gulp и bower

Работа через командную строку:

1. Установите [gulp](http://gulpjs.com) и [Bower](http://bower.io/) глобально командой `npm install -g gulp bower`
2. В директории темы, запустите `npm install`
3. Затем запустите `bower install`
4. PROFIT!!!

### Используемые gulp команды

* `gulp` — Компилирует и оптимизирует файлы в директорию 'assets'
* `gulp watch` — Компилирует файл в директорию 'assets' после изменения
* `gulp --production` — Компилирет исходники для продакшена (отключение карт исходников)

### Использование BrowserSync

Для использования BrowserSync после запуска `gulp watch` требуется обновить ` settings.local_url` в файле `gulpfile.js` для использования локального url

Для примера, если ваше локальный url разработки `http://project-name.dev` требуется обновить файл:
```json
...
  "config": {
    "devUrl": "http://project-name.dev"
  }
...
```
Если url `http://localhost:8888/project-name/` требуется обновить файл:
```json
...
  "config": {
    "devUrl": "http://localhost:8888/project-name/"
  }
...
```
