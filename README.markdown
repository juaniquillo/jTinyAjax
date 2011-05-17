Versión actual

jTinyAjax 1.0

Pruebas hechas en:

IE 7 en adelante, Firefox 3 en adelante, Chrome 10 en adelante, Opera 11 en adelante y Safari 4 en adelante.

Dependencias

El plugin depende de jQuery versión 1.4.2 o mayor debido al uso de funciones como delegate().
También depende del paquete normal de TinyMCE versión 3 o superior. Favor de no usar la versión de jQuery.

Opcional

jQuery UI
BlockUI

Uso

Primero, debemos incluir los archivos necesarios:

<!-- css jTinyMCE -->
<link href="css/jtinyajax.css" rel="stylesheet" type="text/css" />
<!-- Scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js" type="text/javascript"><!--mce:0--></script>
<script src="js/tiny_mce/tiny_mce.js" type="text/javascript"><!--mce:1--></script>
<script src="js/jTinyAjax.jquery.min.js" type="text/javascript"><!--mce:2--></script>

Si se van a usar jQuery UI y/o BlockUI se incluyen también:

<!-- css jquery UI -->
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/base/jquery-ui.css" type="text/css" />
<!-- Scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js" type="text/javascript"><!--mce:3--></script>
<script src="js/jquery.blockUI/jquery.blockUI.min.js" type="text/javascript"><!--mce:4--></script>
La forma más básica de usar jTinyAjax es pasando el URL de la página encargada de interactuar con el servidor, de esta forma:

//con opciones defecto
$('.jtinymceajax').jTinyAjax({
     url: "pagina.php"
});

Opciones

url: defecto – Empty String
URL donde se enviará el contenido. La misma se encargará de las operaciones del lado del servidor
typeRequest: defecto - ”post”
Tipo de request AJAX , “post” o “get”
tinymceinit: defecto - Objeto de opciones de TinyMCE
Opciones de TinyMCE. Para más opciones pueden visitar la página oficial de TinyMCE.
extraParam: defecto - Empty String
Parametros extras para enviar en la consulta AJAX el formato url string:
variable1=valor1&variable2=valor2
buttonTextEdit: defecto - ”save”
Texto del boton de enviar el contenido
buttonTextCancel: defecto - ”cancel”
Texto del boton de cancelar el contenido
UIfy: defecto - false
Opcion para convertir botones en botones de jQuery UI
blockUI: false
Opcion para usar blockUI. Valores: true, false
blockOptions: defecto - Objeto de opciones de blockUI
Opciones de blockUI que se utilizarán si la opción blockUI tiene el valor de true. Para más opciones pueden visitar la página oficial del plugin.
ajaxTypeData: defecto - ”html”
Tipo de data a recibirse. HTML para el comportamiento defecto. Esto equivale al opción dataType de la función ajax() de jQuery. Si se usa json se espera un campo llamado “data” el cual debe poseer la informacion que se quiere colocar en el editor web

Eventos

onClick: function
Callback que se ejecuta cuando se le da click al elemetno para editarlo
onCancel: function
Callback que se ejecuta cuando se le da click al boton de cancelar
onSend: function
Callback que se ejecuta cuando se le da click al boton de enviar
onError: function
Callback que se ejecuta cuando hay un error en la consulta
onSuccess: function
Callback que se ejecuta cuando termine de realizarse la consulta

Demo

jTinyAjax [demos](http://juaniquillo.com/codigo/jquery/jTinyAjax/1.0/)

Descarcar

Descarga el plugin en [GitHub](https://github.com/juaniquillo/jTinyAjax)