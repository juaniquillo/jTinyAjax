/*
 * jQuery jTinyAjax plugin
 * @version 1.0 
 * @requires jQuery v1.4.2 or later
 * @requires jQuery UI v1.8.7 or later
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
        url: "prueba.php",
        typeRequest: "post",
        templateFormEd : '<form action="" class="form_edit_ad"><button class="botons_ui edit_bot_ad" onclick="return false"><span class="ui-button-text"> </span> </button><button class="botons_ui cancelar_bot_ad" onclick="return false"><span class="ui-button-text"> </span></button><input type="hidden" class="editar_hid_imp_ad" value="" /></form>',
        classEdit: "editjTinyAjax",
        idEdit: "jTinyAjax",
        idEditConatiner: "jTinyAjaxContain",
        editContainer: "editarContainer",
        tinymceinit:{
         // General options
         theme : "advanced",
         mode : "exact",
         theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect, removeformat",
         theme_advanced_buttons2 : "",
         theme_advanced_toolbar_location : "top",
         theme_advanced_toolbar_align : "left",
         theme_advanced_statusbar_location : "bottom",
         theme_advanced_resizing : true
      },
      extraParam : '',
      buttonTextEdit: '<span class="ui-icon ui-icon-circle-check">&nbsp;</span>save',
      buttonTextCancel: '<span class="ui-icon ui-icon-circle-close">&nbsp;</span>cancel',
      onClick: function(message){
         alert(message);
      },
      onCancel: function(message){
         alert(message);
      },
      onError: function(message){
        alert(message);
      },
      onSuccess: function(message){
         alert(message);
      },
      ajaxTypeData: 'html'
      
   },
   //metodos internos
   internal = {
      //iniciar plugin
      ini: function(objeto, index){
         
         var idActual = objeto.attr('id'),
            idContainer = options.idEditConatiner + '_' + index,
            idElem = options.idEdit + '_' + index;
            
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
          formEd = $(options.templateFormEd).hide().find('.editar_hid_imp_ad').attr('value', index + 1).end();
         //append texto a los botones
         formEd.find('.edit_bot_ad .ui-button-text').html(options.buttonTextEdit);
         formEd.find('.cancelar_bot_ad .ui-button-text').html(options.buttonTextCancel);
         //agregar id, agregar container y append formulario
         objeto.addClass(options.classEdit).attr('id', idElem).wrap('<div id="'+ idContainer +'" class="container_editor_ad" />').data(dataEle).parent().append(formEd);
         
         //botones UI
         internal.uiInit(dataEle.idContainer);
         
      },
      //activar
      clickEdit: function(objeto){
         var idElem = objeto.data('idEle'), idContainer = objeto.data('idContainer');
         
         $('#' + idContainer).delegate('.editjTinyAjax', 'click', function(){
            elemnt = $('#' + idElem );
            var content = elemnt.html();
            //contenido HTML
            $('#' + idElem ).data({
               'html' : content
            });
            //Opciones de TinyMCE
            defaults.tinymceinit.elements = idElem; 
            //tinyMCE Init (Habilitar tinyMCE)
            tinyMCE.init(options.tinymceinit);
            //mostrar formulario
            $('#' + idContainer + ' .form_edit_ad').show();
            options.onClick(content);

            return false;
	});
         
      },
      //consulta ajax
      send: function(objeto){
         var idElem = objeto.data('idEle'), idContainer = objeto.data('idContainer');
         
         $('#' + idContainer).delegate('.edit_bot_ad', 'click', function(){
            //contenido HTML
            contentHTML = tinyMCE.get(idElem).getContent()
            //bloquear elemento
            internal.block(objeto);
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
                  internal.remove(idElem, idContainer, '');
                  //desbloquear
                  internal.unblock(objeto);
                  //callback
                  options.onSuccess(content);
                  
               },
               error: function(XMLHttpRequest, textStatus, errorThrown){
                  //desbloquear
                  internal.unblock(objeto);
                  ////callback
                  options.onError(textStatus);
               }
            }
            //AJAX
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
      block: function(objeto){
         
      },
      unblock: function(objeto){
         
      },
      //botones jquery UI
      uiInit: function(containerId){
         if($.fn.button){
            //convetir botones a botones de jquery UI
            $('.botons_ui', '#' + containerId).button();
         }
      }
        
   }
   
   return this.each(function(index){
      options = $.extend(defaults, options);
      var objeto = $(this);
      //iniciar
      internal.ini(objeto, index);
      internal.clickEdit(objeto);
      internal.cancel(objeto);
      internal.send(objeto);

   });
 };
 
})(jQuery);