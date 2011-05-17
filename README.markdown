Versi&oacute;n actual

jTinyAjax 1.0

Pruebas hechas en:

IE 7 en adelante, Firefox 3 en adelante, Chrome 10 en adelante, Opera 11 en adelante y Safari 4 en adelante.

Dependencias

El plugin depende de jQuery versi&oacute;n 1.4.2 o mayor debido al uso de funciones como delegate().
Tambi&eacute;n depende del paquete normal de TinyMCE versi&oacute;n 3 o superior. Favor de no usar la versi&oacute;n de jQuery.

Opcional

jQuery UI
BlockUI

Uso

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

Opciones

* url: defecto - Empty String<br/>
URL donde se enviar&aacute; el contenido. La misma se encargar&aacute; de las operaciones del lado del servidor
* typeRequest: defecto - "post"<br/>
Tipo de request AJAX , "post" o "get"
* tinymceinit: defecto - Objeto de opciones de TinyMCE<br/>
Opciones de TinyMCE. Para m&aacute;s opciones pueden visitar la p&aacute;gina oficial de TinyMCE.
* extraParam: defecto - Empty String<br/>
Parametros extras para enviar en la consulta AJAX el formato url string:
<pre>
variable1=valor1&variable2=valor2
</pre>
* buttonTextEdit: defecto - "save"<br/>
Texto del boton de enviar el contenido
* buttonTextCancel: defecto - "cancel"<br/>
Texto del boton de cancelar el contenido
* UIfy: defecto - false<br/>
Opcion para convertir botones en botones de jQuery UI
* blockUI: false<br/>
Opcion para usar blockUI. Valores: true, false
* blockOptions: defecto - Objeto de opciones de blockUI<br/>
Opciones de blockUI que se utilizar&aacute;n si la opci&oacute;n blockUI tiene el valor de true. Para m&aacute;s opciones pueden visitar la p&aacute;gina oficial del plugin.
* ajaxTypeData: defecto - "html"<br/>
Tipo de data a recibirse. HTML para el comportamiento defecto. Esto equivale al opci&oacute;n dataType de la funci&oacute;n ajax() de jQuery. Si se usa json se espera un campo llamado "data" el cual debe poseer la informaci&oacute;n que se quiere colocar en el editor web

Eventos

* onClick: function<br/>
Callback que se ejecuta cuando se le da click al elemetno para editarlo
* onCancel: function<br/>
Callback que se ejecuta cuando se le da click al boton de cancelar
* onSend: function<br/>
Callback que se ejecuta cuando se le da click al boton de enviar
* onError: function<br/>
Callback que se ejecuta cuando hay un error en la consulta
* onSuccess: function<br/>
Callback que se ejecuta cuando termine de realizarse la consulta

Demo

jTinyAjax [demos](http://juaniquillo.com/codigo/jquery/jTinyAjax/1.0/)

Descarcar

Descarga el plugin en [GitHub](https://github.com/juaniquillo/jTinyAjax)