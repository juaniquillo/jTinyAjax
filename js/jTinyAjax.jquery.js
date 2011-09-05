/*
 * jQuery jTinyAjax plugin
 * @version 1.2 
 * @requires jQuery v1.4.2 or later
 * @requires TinyMCE Package
 * @author Victor Sanchez
 * 
 * Copyright (c) 2011 Victor Sanchez
 * http://juaniquillo.com
 * MIT licensed:
 * http://www.opensource.org/licenses/mit-license.php
 */
 
(function($){
   
   $.fn.jTinyAjax = function (options) {
   
   var defaults = {
      //url para el ajax
      url: "",
      //tipo de request
      typeRequest: "post",
      //opciones defecto de TinyMCE
      tinymceinit:{
         theme : "advanced",
         mode : "exact",
         theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect, removeformat",
         theme_advanced_buttons2 : "",
         theme_advanced_toolbar_location : "top",
         theme_advanced_toolbar_align : "left",
         theme_advanced_statusbar_location : "bottom",
         theme_advanced_resizing : true
      },
      //parametros extras para enviar en la consulta AJAX
      extraParam : '',
      //texto del boton de "save"
      buttonTextEdit: 'save',
      //texto del boton de "cancel"
      buttonTextCancel: 'cancel',
      //opcion para convertir botones en botones de jQuery UI
      UIfy: false,
      //opcion para usar blockUI
      blockUI: false,
      //opciones de blockUI
      blockOptions:{ 
         message: '<img src="images/ajax-loader.gif" />',
         overlayCSS: {backgroundColor: '#eee',opacity: 0.5},
         css: { 
            border: 'none',
            backgroundColor: 'transparent'
           // opacity: 0.6
         },
         fadeIn:  200, 
         fadeOut:  200
       },
      //tipo de data a recibirse. HTML para el comportamiento defecto. Si se usa json se espera un campo llamado "data" el cual debe poseer la informacion que se quiere colocar en el editor web
      ajaxTypeData: 'html',
      //callback que se ejecuta cuando se le da click al elemetno para editarlo
      onClick: function(){
         
      },
      //callback que se ejecuta cuando se le da click al boton de cancelar
      onCancel: function(){
         
      },
      //callback que se ejecuta cuando se le da click al boton de enviar
      onSend: function(){
         
      },
      //callback que se ejecuta cuando hay un error en la consulta
      onError: function(){
        
      },
      //callback que se ejecuta cuando se existe un error con la consulta
      onSuccess: function(){
         
      }
   },
   //variables y métodos internos
   internal = {
      //clase que se aplica al container
      classEdit: "editjTinyAjax",
      //id que se aplica al elemento si no tiene uno asignado
      idEdit: "jTinyAjax",
      //id del container
      idEditConatiner: "jTinyAjaxContain",
      //template para el formulario
      templateFormEd : '<form action="" class="form_edit_ad"><button class="botons_ui edit_bot_ad" onclick="return false"><span class="ui-button-text"> </span> </button><button class="botons_ui cancelar_bot_ad" onclick="return false"><span class="ui-button-text"> </span></button><input type="hidden", class="editar_hid_imp_ad" value="" /></form>',
      //iniciar plugin
      ini: function(objeto, index){
		//variables de iniciacion
		 var idActual = objeto.attr('id') || internal.idEdit + '_' + index,
			//id del container
			idContainer = internal.idEditConatiner + '_' + index,
            //objeto para la data()
            dataEle = {
                  'idContainer': idContainer,
                  'idEle': idActual
            },
            //agregar formulario
            formEd = $(internal.templateFormEd).hide().find('.editar_hid_imp_ad').attr('value', index + 1).end();
         //append texto a los botones
         formEd.find('.edit_bot_ad .ui-button-text').html(options.buttonTextEdit).end().find('.cancelar_bot_ad .ui-button-text').html(options.buttonTextCancel);
         //agregar id, agregar id al container, agregar container y append formulario
         objeto.addClass(internal.classEdit).attr('id', idActual).wrap('<div id="'+ idContainer +'" class="container_editor_ad" />').data(dataEle).parent().append(formEd);
         //botones UI
         if(options.UIfy){
            internal.uiInit(dataEle.idContainer);
         }
      },
      //activar
      clickEdit: function(objeto){
		//id elemento
		var idElem = objeto.data('idEle'),
			//id container
			idContainer = objeto.data('idContainer');
         //delegate para el click
         $('#' + idContainer).delegate('.editjTinyAjax', 'click', function(){
            var elemnt = $('#' + idElem ),
               content = elemnt.html();
            //contenido HTML
            $('#' + idElem ).data({
               'html' : content
            });
            //Opciones de TinyMCE
            defaults.tinymceinit.elements = idElem;
            //callback cuando el editor termine de cargar (actualmente no se usa)
            //options.tinymceinit.init_instance_callback = function(){};
            //tinyMCE Init (Habilitar tinyMCE)
            tinyMCE.init(options.tinymceinit);
            //mostrar formulario
            $('#' + idContainer + ' .form_edit_ad').show();
            //callback
            options.onClick(content);
            return false;
	});
         
      },
      //consulta ajax
      send: function(objeto){
         //id elemento
		 var idElem = objeto.data('idEle'),
			//id container
			idContainer = objeto.data('idContainer'),
			//objeto del container
			container = $('#' + idContainer);
         
         container.delegate('.edit_bot_ad', 'click', function(){
               //contenido HTML
            var contentHTML = tinyMCE.get(idElem).getContent(),
               //Parametros extra
               opcionesAjax = {
               //URL para el ajax
               url: options.url,
               //tipo ajax
               type: options.typeRequest,
               //variables a enviar
               data: "data=" + contentHTML + '&' + options.extraParam,
               //tipo de data
               dataType: options.typeData,
               //si se tiene exito
               success: function(content){
                  //quitar elementos/igualar contenido al obtenido por ajax
                  //si es json
                  if(options.ajaxTypeData === "json"){
                     //usar parseJSON() de jQuery para el contenido
                     content = $.parseJSON(content);
                     internal.remove(idElem, idContainer, content.editor);
                  }
                  //si no es json
                  else{
                     internal.remove(idElem, idContainer, content);
                  }
                  //desbloquear
                  if(options.blockUI) {
                     internal.unblockInt(container);
                  }
                  //callback
                  options.onSuccess(content);
                  
               },
               error: function(XMLHttpRequest, textStatus){
                  //desbloquear
                  if(options.blockUI) {
                     internal.unblockInt(container);
                  }
                  ////callback
                  options.onError(textStatus);
               }
            };
            //onSend callback
            options.onSend(contentHTML);
            //bloquear elemento
            if(options.blockUI) {
               internal.blockInt(container);
            }
            // Llamada AJAX
            $.ajax(opcionesAjax);
         });
         
      },
      //cancelar
      cancel: function(objeto){
		 //id elemento
		 var idElem = objeto.data('idEle'),
			//id container
			idContainer = objeto.data('idContainer'),
			//content esta vacio
			content;
         $('#' + idContainer).delegate('.cancelar_bot_ad', 'click', function(){
            content = $('#' + idElem).data('html');
            internal.remove(idElem, idContainer, content);
            options.onCancel(content);
            return false;
         });
      },
      //remover
      remove: function(idElem, idContainer, content){
         //contenido
         if(content !== '') {
            tinyMCE.get(idElem).setContent(content);
         }
         //remover instance de tinyMCE
         tinyMCE.execCommand('mceRemoveControl', false, idElem);
         //ocultar formulario
         $('.form_edit_ad', '#' + idContainer).hide();
      },
      //bloquear plugin
      blockInt: function(objeto){
         if($.fn.block){
            objeto.block(options.blockOptions);
         }
      },
      //desbloquear plugin
      unblockInt: function(objeto){
         if($.fn.unblock){
            objeto.unblock();
         }
      },
      //botones jquery UI
      uiInit: function(containerId){
         if($.fn.button){
            //convetir botones a botones de jquery UI
            $('.botons_ui', '#' + containerId).button();
         }
      }
        
   };
   
   return this.each(function(){
      //para tener id únicos para los editores y containers
	  var $index2 = $('div[id^="'+ internal.idEdit +'"]').length;
	  //opciones
	  options = $.extend(defaults, options);
	  //objeto jquery actual
      var objeto = $(this);
      //iniciar
      internal.ini(objeto, $index2);
      //click
      internal.clickEdit(objeto);
      //cancel
      internal.cancel(objeto);
      //enviar
      internal.send(objeto);

   });
 };
 
}(jQuery));