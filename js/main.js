$(document).ready(function () {});

//Buscar
//========================================================================
function BuscarCarro(str) {
	if (str == "") {
		document.getElementById("txtBuscaCarro").innerHTML = "";
		return;
	} else {
		//Quando a pagina receber uma requisicao
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		//Quando a página estiver pronta
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {

				//Convertendo de Json para um objeto em JS mais facil de manipular
				var arrayResult = jQuery.parseJSON(this.responseText);
				var content = "";

				//Se retornar com resultado
				if (arrayResult.length !== 0) {
					//Pega cada resultado e monta o html para exibicao
					$.each(arrayResult, function (i, item) {
						content += '<div id="divCarro_' + item.ID_CARRO + '">'
						 + '<span id="marca_' + item.ID_CARRO + '" class="js_span">' + item.NOME_MARCA + '</span> - '
						 + '<span id="modelo_' + item.ID_CARRO + '" class="js_span">' + item.NOME_MODELO + '</span> '
						 + '(<span id="ano_' + item.ID_CARRO + '" class="js_span">' + item.ANO + '</span>)'
						 + '<input id="btnExcluir" value="Excluir" onclick="ExcluirCarro(this)" class="js_input" type="button" />'
						 + '<input id="btnEditar" value="Editar" onclick="EditarCarro(this)" class="js_input" type="button" /></span></div>'
						 + '<br />'
						 + '</div>'
					});
				} else {
					content = "";
				}

				document.getElementById("txtBuscaCarro").innerHTML = content;
			}
		};
		//Envia a requisicao, buscando a palavra chave tanto no campo 'marca' quanto no campo 'modelo'
		//Traz o resultado por ordem alfabetica da marca
		xmlhttp.open("GET", "api.php/carros/search?marca=" + str + "&modelo=" + str + "&orderby=marca", true);
		xmlhttp.send();
	}
}
//========================================================================

//Excluir
//========================================================================
function ExcluirCarro(sender) {
	if (sender == "") {
		return;
	} else {
		if (confirm("Deseja excluir este carro?") == true) {
			if (window.XMLHttpRequest) {
				// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp = new XMLHttpRequest();
			} else {
				// code for IE6, IE5
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			//Remove o elemento html
			var item = sender.parentNode;
			var pai = item.parentNode;
			pai.removeChild(item);
			var id = item.id.substring(item.id.indexOf("_") + 1, item.id.length);

			//Envia a requisicao para remover do banco de dados
			xmlhttp.open("DELETE", "api.php/carros/id=" + id, true);
			xmlhttp.send();

		} else {
			return;
		}

	}
}
//========================================================================

//Editar
//========================================================================
function EditarCarro(sender) {
	if (sender == "") {
		return;
	} else {
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var item = sender.parentNode;
		var id = item.id.substring(item.id.indexOf("_") + 1, item.id.length);

		//Usuario ainda nao alterou. Precisa transformar o span em input para ele poder alterar
		if (item.children[0].tagName.toLowerCase() == "span") {
			//Resgata os valores da tela
			var marca = item.children[0].innerHTML;
			var modelo = item.children[1].innerHTML;
			var ano = item.children[2].innerHTML;

			//transforma o span em input
			$("#" + item.children[0].id).replaceWith("<input type=\"text\" class='js_input' id=\"marca_" + id + "\" value=\"" + marca + "\" />");
			$("#" + item.children[1].id).replaceWith("<input type=\"text\" class='js_input' id=\"modelo_" + id + "\" value=\"" + modelo + "\" />");
			$("#" + item.children[2].id).replaceWith("<input type=\"text\" class='js_input' id=\"ano_" + id + "\" value=\"" + ano + "\" />");
		}
		//O usuario ja alterou, entao pode enviar a requisicao
		else if (item.children[0].tagName.toLowerCase() == "input") {
			//Resgata os valores da tela
			var marca = item.children[0].value;
			var modelo = item.children[1].value;
			var ano = item.children[2].value;

			//Envia a requisicao para alterar no banco de dados
			xmlhttp.open("PUT", "api.php/carros/id=" + id, true);
			xmlhttp.send("{\"NOME_MARCA\":\"" + marca
				 + "\",\"NOME_MODELO\":\"" + modelo
				 + "\",\"ANO\":\"" + ano + "\"}");

			//transforma o input em span
			$("#" + item.children[0].id).replaceWith("<span class='js_span' id=\"marca_\"" + id + ">" + marca + "</span>");
			$("#" + item.children[1].id).replaceWith("<span class='js_span' id=\"modelo_\"" + id + ">" + modelo + "</span>");
			$("#" + item.children[2].id).replaceWith("<span class='js_span' id=\"ano_\"" + id + ">" + ano + "</span>");

		}
		//atualizar na tela

	}
}
//========================================================================

//Adicionar
//========================================================================
function AdicionarCampo(sender) {
	var destino = document.getElementById(sender.id);

	//Criar elemento e anexar a pagina
	var divPai = document.createElement('div');
	divPai.className = "js_div";
	divPai.id = "divAdicionarCarro";
	destino.appendChild(divPai);

	var inputMarca = document.createElement('input');
	inputMarca.type = "text";
	inputMarca.placeholder = "Digite a Marca";
	inputMarca.className = "js_input";
	divPai.appendChild(inputMarca);

	var inputModelo = document.createElement('input');
	inputModelo.type = "text";
	inputModelo.placeholder = "Digite o Modelo";
	inputModelo.className = "js_input";
	divPai.appendChild(inputModelo);

	var inputAno = document.createElement('input');
	inputAno.type = "text";
	inputAno.placeholder = "Digite o Ano";
	inputAno.className = "js_input";
	divPai.appendChild(inputAno);

	var btnAdicionar = document.createElement('input');
	btnAdicionar.type = "button";
	btnAdicionar.value = "Adicionar Carro";
	btnAdicionar.className = "js_button";
	btnAdicionar.id = "btnAdicionar";
	divPai.appendChild(btnAdicionar);
	$("#btnAdicionar").click(function () {
		AdicionarCarro(this);
	});

	var quebraLinha = document.createElement('br');
	divPai.appendChild(quebraLinha);
}

function AdicionarCarro(sender) {
	if (sender == "") {
		return;
	} else {
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}	
		var item = sender.parentNode;

		//Resgata os valores da tela
		var marca = item.children[0].value;
		var modelo = item.children[1].value;
		var ano = item.children[2].value;

		//Envia a requisicao para alterar no banco de dados
		xmlhttp.open("POST", "api.php/carros/", true);
		xmlhttp.send("{\"NOME_MARCA\":\"" + marca
			 + "\",\"NOME_MODELO\":\"" + modelo
			 + "\",\"ANO\":\"" + ano + "\"}");

		var pai = item.parentNode;
		pai.removeChild(item);
	}
}
//========================================================================

//Metodo utilizado para copiar o resultado da busca, que e dinamico, e colocar em outro local da tela, para 'guarda-lo'
function CopiarConteudo(IdOrigem, IdDestino) {
	var origem = document.getElementById(IdOrigem.id);
	var destino = document.getElementById(IdDestino.id);

	if (origem.innerHTML !== "") {
		destino.innerHTML = origem.innerHTML;
	}
}
