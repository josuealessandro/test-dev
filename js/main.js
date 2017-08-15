$(document).ready(function () { });
    
//Buscar
//========================================================================
function BuscarCarro(str) {
    if (str == "") {
        document.getElementById("chave-busca").innerHTML = "";
        document.getElementById("coneudoResultado").innerHTML = "";
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
                        content += '<tr>'
                            + '<th scope="row">' + item.ID_CARRO + '</th>'
                            + '<td>' + item.NOME_MARCA + '</td>'
                            + '<td>' + item.NOME_MODELO + '</td>'
                            + '<td>' + item.ANO + '</td>'
                            + '<td style="text-align: right;"><input id="btnExcluir" value="Excluir" onclick="ExcluirCarro(this)" class="js_input btn btn-outline-danger" type="button" /></td>'
                            + '<td style="text-align: left;"><input id="btnEditar" value="Editar" onclick="EditarCarro(this)" class="js_input btn btn-outline-info" type="button" /></td>'
                            + '</tr>'
                    });
                } else {
                    content = "";
                }

                document.getElementById("coneudoResultado").innerHTML = content;
                document.getElementById("chave-busca").innerHTML = str;
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
        if (item.children[0].tagName.toLowerCase() == "th") {
            //Resgata os valores da tela
            var marca = item.children[0].innerHTML;
            var modelo = item.children[1].innerHTML;
            var ano = item.children[2].innerHTML;

            //transforma o span em input
            $("#" + item.children[0].id).replaceWith("<input type=\"text\" class='js-edit_input form-control' id=\"marca_" + id + "\" value=\"" + marca + "\" />");
            $("#" + item.children[1].id).replaceWith("<input type=\"text\" class='js-edit_input form-control' id=\"modelo_" + id + "\" value=\"" + modelo + "\" />");
            $("#" + item.children[2].id).replaceWith("<input type=\"text\" class='js-edit_input form-control' id=\"ano_" + id + "\" value=\"" + ano + "\" />");
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
    divPai.className = "js-add_div";
    divPai.id = "divAdicionarCarro_" + Math.floor(Math.random() * 50) + 1;
    destino.appendChild(divPai);

    var inputMarca = document.createElement('input');
    inputMarca.type = "text";
    inputMarca.placeholder = "Digite a Marca";
    inputMarca.className = "js-add_input form-control";
    divPai.appendChild(inputMarca);

    var inputModelo = document.createElement('input');
    inputModelo.type = "text";
    inputModelo.placeholder = "Digite o Modelo";
    inputModelo.className = "js-add_input form-control";
    divPai.appendChild(inputModelo);

    var inputAno = document.createElement('input');
    inputAno.type = "text";
    inputAno.placeholder = "Digite o Ano";
    inputAno.className = "js-add_input form-control";
    divPai.appendChild(inputAno);

    var btnAdicionar = document.createElement('input');
    btnAdicionar.type = "button";
    btnAdicionar.value = "Adicionar Carro";
    btnAdicionar.className = "js_button btn btn-outline-success";
    btnAdicionar.id = "btnAdicionar" + Math.floor(Math.random() * 50) + 1;
    divPai.appendChild(btnAdicionar);
    $("#"+btnAdicionar.id).click(function () {
        AdicionarCarro(this);
    });

    var btnCancelar = document.createElement('input');
    btnCancelar.type = "button";
    btnCancelar.value = "Cancelar";
    btnCancelar.className = "js_button btn btn-outline-secondary";
    btnCancelar.id = "btnCancelar" + Math.floor(Math.random() * 50) + 1;
    divPai.appendChild(btnCancelar);
    $("#"+btnCancelar.id).click(function () {
        destino.removeChild(divPai);
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
        setTimeout(function () {
            BuscarCarro(marca);
        }, 1000);
    }
}
//========================================================================

//Metodo utilizado para copiar o resultado da busca, que e dinamico, e colocar em outro local da tela, para 'guarda-lo'
function CopiarConteudo(IdOrigem, IdDestino) {
    var origem = document.getElementById(IdOrigem.id);
    var destino = document.getElementById(IdDestino.id);

    if (origem.innerHTML !== "") {
        destino.innerHTML = origem.innerHTML;
        origem.innerHTML = "";
    }
}
