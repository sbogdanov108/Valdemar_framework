/**
 * Created by sergey on 08.11.15.
 */
;( function( global, $ )
{
  'use strict';

  /* Для генерации нового Вальдемара без использвания new */
  var Valdemar = function( firstName, lastName, language )
  {
    return new Valdemar.init( firstName, lastName, language );
  };

  var supportedLangs = [ 'en', 'ru' ];

  var greetings = {
    en: 'Hello',
    ru: 'Привет'
  };

  var formalGreetings = {
    en: 'Greetings',
    ru: 'Здравствуйте'
  };

  var logMessages = {
    en: 'Logged in',
    ru: 'Вход выполнен'
  };

  /* Эти методы будут в прототипе объекта */
  Valdemar.prototype = {

    fullName: function()
    {
      return this.firstName + ' ' + this.lastName;
    }, /* Получить имя и фамилию */

    validate: function()
    {
      if( supportedLangs.indexOf( this.language ) === -1 )
        throw 'Invalid language';
    }, /* Проверить, есть ли в массиве поддерживаемый язык */

    greeting: function()
    {
      return greetings[ this.language ] + ', ' + this.firstName + '!';
    }, /* Поздороваться неформально */

    formalGreeting: function()
    {
      return formalGreetings[ this.language ] + ', ' + this.fullName() + '.';
    }, /* Поздороваться формально */

    greet: function( formal )
    {
      var msg;

      msg = formal ? this.formalGreeting() : this.greeting();

      if( console )
        console.log( msg );

      return this;
    }, /* Обертка для greeting and greetingFormal; Возвращает chain */

    log: function()
    {
      if( console )
        console.log( logMessages[ this.language ] + ':', this.fullName() );

      return this;
    }, /* Вывод в консоль; Возвращает chain */

    setLang: function( lang )
    {
      this.language = lang;
      this.validate();

      return this;
    }, /* Установить новый язык; Возвращает chain */

    HTMLGreeting: function( selector, formal )
    {
      if( ! $ )
        throw 'jQuery not loaded';

      if( ! selector )
        throw 'Missing jQuery selector';

      var msg;

      if( formal )
        msg = this.formalGreeting();
      else
        this.greeting();

      $( selector ).html( msg );

      return this
    } /* Некоторая поддержка jQuery; Возвращает chain */
  };

  /* Инициализация Вальдемара
   * Функция конструктор
   * Позволяет создавать новый объект без new
  */
  Valdemar.init = function( firstName, lastName, language )
  {
    var self = this;

    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();
  };

  /* Указание на то, где будут создаваться приватные методы */
  Valdemar.init.prototype = Valdemar.prototype;

  /* Добавление Вальдемара в глобалный объект windows и создание короткой ссылки V$ */
  global.Valdemar = global.V$ = Valdemar;
}( window, jQuery ));