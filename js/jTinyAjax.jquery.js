/*
 * jQuery jTinyAjax plugin
 * @version 1.0 
 * @requires jQuery v1.4.2 or later
 * @requires TinyMCE Package
 * @author Victor Sanchez
 * 
 * Copyright (c) 2011 Victor Sanchez
 * http://juaniquillo.com
 * MIT licensed:
 * http://www.opensource.org/licenses/mit-license.php
 */
 
(function($) {
   
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
      onClick: function(message){
         
      },
      //callback que se ejecuta cuando se le da click al boton de cancelar
      onCancel: function(message){
         
      },
      //callback que se ejecuta cuando se le da click al boton de enviar
      onSend: function(message){
         
      },
      //callback que se ejecuta cuando hay un error en la consulta
      onError: function(message){
        
      },
      //callback que se ejecuta cuando se existe un error con la consulta
      onSuccess: function(message){
         
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
         var idActual = objeto.attr('id'),
            idContainer = internal.idEditConatiner + '_' + index,
            idElem = internal.idEdit + '_' + index;
            
         //verificar si el elemento tiene id
         if(idActual) {
            idElem = idActual;
          }
            
         //objeto para la data()
         var dataEle = {
               'idContainer': idContainer,
               'idEle': idElem
          },
         //agregar formulario
          formEd = $(internal.templateFormEd).hide().find('.editar_hid_imp_ad').attr('value', index + 1).end();
         //append texto a los botones
         formEd.find('.edit_bot_ad .ui-button-text').html(options.buttonTextEdit).end().find('.cancelar_bot_ad .ui-button-text').html(options.buttonTextCancel);
         //agregar id, agregar id al container, agregar container y append formulario
         objeto.addClass(internal.classEdit).attr('id', idElem).wrap('<div id="'+ idContainer +'" class="container_editor_ad" />').data(dataEle).parent().append(formEd);
         
         //botones UI
         if(options.UIfy){
            internal.uiInit(dataEle.idContainer);
         }
         
      },
      //activar
      clickEdit: function(objeto){
         var idElem = objeto.data('idEle'), idContainer = objeto.data('idContainer');
         //delegate para el click
         $('#' + idContainer).delegate('.editjTinyAjax', 'click', function(){
            elemnt = $('#' + idElem );
            var content = elemnt.html();
            //contenido HTML
            $('#' + idElem ).data({
               'html' : content
            });
            //Opciones de TinyMCE
            defaults.tinymceinit.elements = idElem;
            //callback cuando el editor termine de cargar
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
         var idElem = objeto.data('idEle'), idContainer = objeto.data('idContainer'), container = $('#' + idContainer);
         
         container.delegate('.edit_bot_ad', 'click', function(){
            //contenido HTML
            contentHTML = tinyMCE.get(idElem).getContent()
            //onSend callback
            options.onSend(contentHTML);
            //bloquear elemento
            if(options.blockUI) internal.blockInt(container);
            //Parametros extra
            var opcionesAjax = {
               //URL para el ajax
               url: options.url,
               //tipo ajax
               type: options.typeRequest,
               //variables a enviar
               data: "data=" + contentHTML + '&' + options.extraParam,
               //tipo de data
               dataType: options.typeData,
               //si se tiene exito
               success: function(content, textStatus, XMLHttpRequest){
                  //quitar elementos/igualar contenido al obtenido por ajax
                  if(options.ajaxTypeData == "json"){
                     internal.remove(idElem, idContainer, content.data);
                  }
                  else{
                     internal.remove(idElem, idContainer, content);
                  }
                  //desbloquear
                  if(options.blockUI) internal.unblockInt(container);
                  //callback
                  options.onSuccess(content);
                  
               },
               error: function(XMLHttpRequest, textStatus, errorThrown){
                  //desbloquear
                  if(options.blockUI) internal.unblockInt(container);
                  ////callback
                  options.onError(textStatus);
               }
            }
            // Llamada AJAX
            $.ajax(opcionesAjax);
         
         })
         
      },
      //cancelar
      cancel: function(objeto){
         var idElem = objeto.data('idEle'), idContainer = objeto.data('idContainer');
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
         if(content !== '') tinyMCE.get(idElem).setContent(content);
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
            objeto.unblock()
         }
      },
      //botones jquery UI
      uiInit: function(containerId){
         if($.fn.button){
            //convetir botones a botones de jquery UI
            $('.botons_ui', '#' + containerId).button();
         }
      }
        
   }
   //para tener id únicos para los editores y containers
   var $index2 = $('div[id^="'+ internal.idEdit +'"]').length;
   return this.each(function(){
      options = $.extend(defaults, options);
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
 
})(jQuery);