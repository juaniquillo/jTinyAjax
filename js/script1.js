//Bloquear elementos o el body. Acepta un object jquery
function blockGen(elem){
	//console.log(elem);
	if(elem.length){
		elem.block({ 
			message: '<img src="imagenes/ajax-loader3.gif" />',
			overlayCSS: {backgroundColor: '#EEFFEE',opacity: 0.9},
			css: { 
				border: 'none', 
				backgroundColor: '#EEFFEE', 
				opacity: 0.9
			},
			fadeIn:  200, 
			fadeOut:  200
		});
	}
	else{
		$.blockUI({ 
			message: '<img src="imagenes/ajax-loader2.gif" />',
			overlayCSS: {backgroundColor: '#EEFFEE',opacity: 0.9},
			css: { 
				border: 'none', 
				backgroundColor: '#EEFFEE', 
				opacity: 0.9
			},
			fadeIn:  200, 
			fadeOut:  200
		});
	}
}

//Cuando el DOM este listo
jQuery(document).ready(function() {
	
	//botones
	$(".botones", '#admin_menu').button();
	//drop down
	$('#contenidos_sl').selectmenu({
		style:'dropdown', 
		width: 250
	});

	
	//pagina para AJAX
	var paginaEditarAD = 'include/admin_bar/editar_ad.php';
   
	//template HTML
	var templateFormEd = '<form action="" class="form_edit_ad"><button class="botones ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only edit_bot_ad" onclick="return false"><span class="ui-button-text"><span class="ui-icon ui-icon-circle-check">&nbsp;</span>editar</span></button><button class="botones ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only cancelar_ed_ad" onclick="return false"><span class="ui-button-text"><span class="ui-icon ui-icon-circle-close">&nbsp;</span>cancelar</span></button><input type="hidden" class="editar_hid_imp_ad" value="" /></form>';
	
	
	////// Inicializar
	$('.editar_ad_dv', '#cuerpo').each(function(){
		
		//variables
		var elemento = $(this), id = elemento.attr('id'), elemntoEditado, editarAr = id.split('_'), editarContainer = 'contaniner_edit_'+ editarAr[2], htmlActual = $('#'+ editarContainer).html(), validacion_inp = elemento.find('.validacion_contenido'), validacion = parseInt(validacion_inp.val());
		
		//asociar numero de contenido al div. Esa forma lo recopero más rapido y no tengo que buscarlo en el DOM de nuevo.
		elemento.data('idEd', editarAr[2]);
		if(validacion > 1) {
			elemento.data('validacion', validacion);
		};
		//agregar un conteniner
		elemento.wrap('<div id="'+ editarContainer +'" class="container_editor_ad" />');
		
		//agregar formulario
		formEd = $(templateFormEd).hide().find('.editar_hid_imp_ad').attr('value', editarAr[2]).end();
		$('#'+ editarContainer).append(formEd);
		
		//quitar input de validacion
		validacion_inp.remove();
		
	});
	
	// Activar
	$('#cuerpo').delegate('.editar_ad_dv', 'click', function(){
			
		//variables
		var  divEditar = $(this), idDiv = 'contenido_ad_' + divEditar.data('idEd'), idContainer = 'contaniner_edit_' + divEditar.data('idEd');
		//habilitar tinyMCE
		tinyMCE.execCommand('mceAddControl', false, idDiv);
		//mostrar formulario
		$('#'+ idContainer + ' .form_edit_ad').show();
		//botones
		$(".edit_bot_ad, .cancelar_ed_ad", '#cuerpo').button();
		
		//console.log( divEditar.data('validacion'));
		
		return false;
		
	});
	
	// Editar
	$('#cuerpo').delegate('.edit_bot_ad', 'click', function(){
			
		var editBT = $(this), idEdit = editBT.next().next().val(), idContainer = 'contaniner_edit_' + idEdit, idEditar = 'contenido_ad_' + idEdit, contentHTML, elementoObj = $('#' + idContainer), validacion_id = $('#' + idEditar).data('validacion'), validcion_usar;
		
		//contenido HTML
		contentHTML = tinyMCE.get(idEditar).getContent()
		//bloquear elemento
		blockGen(elementoObj);
		//Validacion
		(validacion_id > 1) ? validcion_usar = validacion_id : validcion_usar = 1;
		//AJAX
		$.post(paginaEditarAD,{validacion:validcion_usar, id:idEdit, content:contentHTML},function(data){
			//desbloquear
			elementoObj.unblock();
			//recibir data
			if(data == 1){
				cancelarForm(idEditar, idContainer, contentHTML);
			}
			else{
				//$.prompt('ha ocurrido un error');
				$.prompt(data);
			}	
		});
		
	});
	
	/////// Cancelar
	$('#cuerpo').delegate('.cancelar_ed_ad', 'click', function(){
			
		var idEdit = $(this).next().val(), idContainer = 'contaniner_edit_' + idEdit, idEditar = 'contenido_ad_' + idEdit, contentHTML = $('#' + idEditar).html();
		
		cancelarForm(idEditar, idContainer, contentHTML);
		
	});
	
	function cancelarForm(idEditar, idContainer, content){
		//contenido
		tinyMCE.get(idEditar).setContent(content);
		
		//remover instance de tinyMCE
		tinyMCE.execCommand('mceRemoveControl', false, idEditar);
		//ocultar formulario
		$('.form_edit_ad', '#' + idContainer).hide();
		
	}
	
	
	
	
});

