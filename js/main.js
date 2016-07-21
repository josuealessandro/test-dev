$('#conteudo').load('carros/');

function cadNovo(){
	$('#telapreta').fadeIn();
	$('#conteudo2').fadeIn();
	$('#conteudo2').load('formulario/');
}

function edita(id){
	$('#telapreta').fadeIn();
	$('#conteudo2').fadeIn();
	$('#conteudo2').load('formulario/'+id);
}

function deleta(id){
	if(confirm('Tem certeza que deseja excluir esse carro?')){
		$.post('carros/'+id,{deletar:'S'},function(dados){
			$('#conteudo').html(dados);
		});
	}
}

function cancela(){
	$('#telapreta').fadeOut();
	$('#conteudo2').fadeOut();
	$('#conteudo').load('carros/');
}

$(document).ready(function() { 
    var options = { 
        target:        '#conteudo',
    }; 
  
    $('#formulario').ajaxForm(options); 
}); 