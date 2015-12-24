/**
 * Created by sergey on 08.11.15.
 */

var g = V$( 'Сергей', 'Богданов' );

g.greet().setLang( 'ru' ).greet( true );

$( '#login' ).click( function()
{
  var loginValdemar = V$( 'Sergey', 'Bogdanov' );

  $( 'logindiv' ).hide();
  loginValdemar.setLang( $( '#lang' ).val() ).HTMLGreeting( '#greeting', true ).log(); // получить значение селектора и установить язык
} );