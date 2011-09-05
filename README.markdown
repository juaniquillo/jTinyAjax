<h2>Versi&oacute;n actual</h2>

jTinyAjax 1.2

<h2>Pruebas hechas en:</h2>

IE 7 en adelante, Firefox 3 en adelante, Chrome 10 en adelante, Opera 11 en adelante y Safari 4 en adelante.

<h2>Dependencias</h2>

El plugin depende de jQuery versi&oacute;n 1.4.2 o mayor debido al uso de funciones como delegate().
Tambi&eacute;n depende del paquete normal de TinyMCE versi&oacute;n 3 o superior. Favor de no usar la versi&oacute;n de jQuery.

<h2>Opcional</h2>

jQuery UI<br/>
BlockUI

<h2>Uso</h2>

Primero, debemos incluir los archivos necesarios:

<pre>
&lt;!-- css jTinyMCE --&gt;
&lt;link href="css/jtinyajax.css" rel="stylesheet" type="text/css" /&gt;
&lt;!-- Scripts --&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="js/tiny_mce/tiny_mce.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="js/jTinyAjax.jquery.min.js" type="text/javascript"&gt;&lt;/script&gt;
</pre>

Si se van a usar jQuery UI y/o BlockUI se incluyen tambi&eacute;n:

<pre>
&lt;!-- css jquery UI --&gt;
&lt;link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/base/jquery-ui.css" type="text/css" /&gt;
&lt;!-- Scripts --&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="js/jquery.blockUI/jquery.blockUI.min.js" type="text/javascript"&gt;&lt;/script&gt;
</pre>

La forma m&aacute;s b&aacute;sica de usar jTinyAjax es pasando el URL de la p&aacute;gina encargada de interactuar con el servidor, de esta forma:

<pre>
//con opciones defecto
$('.jtinymceajax').jTinyAjax({
     url: "pagina.php"
});
</pre>

<h2>Opciones</h2>

* <strong>url</strong>: defecto - Empty String<br/>
URL donde se enviar&aacute; el contenido. La misma se encargar&aacute; de las operaciones del lado del servidor
* <strong>typeRequest</strong>: defecto - "post"<br/>
Tipo de request AJAX , "post" o "get"
* <strong>tinymceinit</strong>: defecto - Objeto de opciones de TinyMCE<br/>
Opciones de TinyMCE. Para m&aacute;s opciones pueden visitar la p&aacute;gina oficial de TinyMCE.
* <strong>extraParam</strong>: defecto - Empty String<br/>
Parametros extras para enviar en la consulta AJAX el formato url string:
<pre>
variable1=valor1&variable2=valor2
</pre>
* <strong>buttonTextEdit</strong>: defecto - "save"<br/>
Texto del boton de enviar el contenido
* <strong>buttonTextCancel</strong>: defecto - "cancel"<br/>
Texto del boton de cancelar el contenido
* <strong>UIfy</strong>: defecto - false<br/>
Opcion para convertir botones en botones de jQuery UI
* <strong>blockUI</strong>: false<br/>
Opcion para usar blockUI. Valores: true, false
* <strong>blockOptions</strong>: defecto - Objeto de opciones de blockUI<br/>
Opciones de blockUI que se utilizar&aacute;n si la opci&oacute;n blockUI tiene el valor de true. Para m&aacute;s opciones pueden visitar la p&aacute;gina oficial del plugin.
* <strong>ajaxTypeData</strong>: defecto - "html"<br/>
Tipo de data a recibirse. HTML para el comportamiento defecto. Esto equivale al opci&oacute;n dataType de la funci&oacute;n ajax() de jQuery. Si se usa json se espera un campo llamado "editor" el cual debe poseer la informaci&oacute;n que se quiere colocar en el editor web. El json puede contener cualquier campo adicional, ejemplo:
<pre>
{"editor":"esto se pone en el editor","mensaje":"este es un mensaje adicional"}
</pre>
El json será "parseado" antes de pasarse a los eventos usando el método "$.parseJSON()" de jQuery.

<h2>Eventos</h2>

* <strong>onClick</strong>: function<br/>
Callback que se ejecuta cuando se le da click al elemetno para editarlo
* <strong>onCancel</strong>: function<br/>
Callback que se ejecuta cuando se le da click al boton de cancelar
* <strong>onSend</strong>: function<br/>
Callback que se ejecuta cuando se le da click al boton de enviar
* <strong>onError</strong>: function<br/>
Callback que se ejecuta cuando hay un error en la consulta
* <strong>onSuccess</strong>: function<br/>
Callback que se ejecuta cuando termine de realizarse la consulta

<h2>Demo</h2>

jTinyAjax [demos](http://juaniquillo.com/blog/2011/05/jtinyajax/#demos)

<h2>Descarcar</h2>

Descarga el plugin en [GitHub](https://github.com/juaniquillo/jTinyAjax)

<h2>English Version</h2>
I'm currently working on an english version of this document.