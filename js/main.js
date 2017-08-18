$(document).ready(function () {

    //Filtro da barra de busca
    $('.search-panel .dropdown-menu').find('a').click(function (e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });
    $(".container").hide();

    $(".container").fadeIn(1000);

});

//Buscar
//========================================================================
function BuscarCarro(chave_busca, filtro) {
    if (chave_busca == "") {
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
                    //Pega cada resultado e monta o html basico para exibicao
                    $.each(arrayResult, function (i, item) {
                        content += '<tr>'
                            + '<th scope="row">' + item.ID_CARRO + '</th>'
                            + '<td>' + item.NOME_MARCA + '</td>'
                            + '<td>' + item.NOME_MODELO + '</td>'
                            + '<td>' + item.ANO + '</td>'
                            + '<td style="text-align: right;"><input id="btnEditar_' + item.ID_CARRO + '" value="Editar" onclick="EditarCarro(this)" class="js_input btn btn-outline-info" type="button" /></td>'
                            + '<td style="text-align: left;"><input id="btnExcluir_' + item.ID_CARRO + '" value="Excluir" onclick="ExcluirCarro(this)" class="js_input btn btn-outline-danger" type="button" /></td>'
                            + '</tr>'
                    });
                } else {
                    content = "";
                }

                document.getElementById("coneudoResultado").innerHTML = content;
                document.getElementById("chave-busca").innerHTML = chave_busca;

            }
        };

        //Tipo de requisição simples
        //==============================
        //xmlhttp.open("GET", "api.php/carros/search?marca=" + chave_busca + "&modelo=" + chave_busca + "&orderby=marca", true);
        //xmlhttp.send();
        //==============================


        var strURLBusca = "";
        var tipo = "";
        var order = "";

        //Filtra a busca pelo parâmetro informado
        if (filtro !== "") {
            strURLBusca = "search?";
            tipo = filtro.tipo.toLowerCase();
            order = filtro.asc; //variavel booleana: true = asc / false = desc
            if (order == "")
                order = "true";
        }
        //Filtra a busca pelos cookies
        else if (getCookie("filtroTipo") !== "") {
            strURLBusca = "search?";
            tipo = getCookie("filtroTipo");
            order = getCookie("asc"); //variavel booleana: true = asc / false = desc
            if (order == "")
                order = "true";
        }

        //Determina o tipo da busca
        if (tipo !== "") {
            switch (tipo) {
                case "marca":
                    strURLBusca += "marca=" + chave_busca + "&orderby=marca&asc=" + order;
                    break;
                case "modelo":
                    strURLBusca += "modelo=" + chave_busca + "&orderby=modelo&asc=" + order;
                    break;
                case "ano":
                    strURLBusca += "ano=" + chave_busca + "&orderby=ano&asc=" + order;
                    break;
                case "tudo":
                    strURLBusca += "marca=" + chave_busca + "&modelo=" + chave_busca;
                    if (isNumero(chave_busca))
                        strURLBusca += "&ano=" + chave_busca;
                    break;
                default:
                    strURLBusca += "marca=" + chave_busca + "&modelo=" + chave_busca;
                    if (isNumero(chave_busca))
                        strURLBusca += "&ano=" + chave_busca;
                    break;
            }
        }
        else {
            strURLBusca = "search?marca=" + chave_busca + "&modelo=" + chave_busca;
            if (isNumero(chave_busca))
                strURLBusca += "&ano=" + chave_busca;
        }


        //Abre uma requisicao de busca
        if (strURLBusca !== "") {
            xmlhttp.open("GET", "api.php/carros/" + strURLBusca, true);
        }
        else {
            xmlhttp.open("GET", "api.php/carros/", true);
        }

        //Envia a requisicao de busca
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

            //Pega o ID do carro
            var id = sender.id.substring(sender.id.indexOf("_") + 1, sender.id.length);

            //filho é a <tr>
            var filho = sender.parentNode.parentNode;

            //pai é a <tbody>
            var pai = document.getElementById("coneudoResultado");
            pai.removeChild(filho);

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
        var trPai = sender.parentNode.parentNode;
        var id = sender.id.substring(sender.id.indexOf("_") + 1, sender.id.length);

        //Usuario ainda nao alterou os dados. Precisa inserir um input para ele poder alterar
        if (trPai.children[1].innerHTML.toLowerCase().indexOf("input") == -1) { //-1 significa que nao ha input

            //Resgata os valores da tela
            var marca = trPai.children[1].innerHTML;
            var modelo = trPai.children[2].innerHTML;
            var ano = trPai.children[3].innerHTML;

            //Insere o input
            $(trPai.children[1]).replaceWith("<td><input type=\"text\" class='js-edit_input form-control' id=\"marca_" + id + "\" value=\"" + marca + "\" /></td>");
            $(trPai.children[2]).replaceWith("<td><input type=\"text\" class='js-edit_input form-control' id=\"modelo_" + id + "\" value=\"" + modelo + "\" /></td>");
            $(trPai.children[3]).replaceWith("<td><input type=\"text\" class='js-edit_input form-control' id=\"ano_" + id + "\" value=\"" + ano + "\" /></td>");

            sender.className = "js_input btn btn-success";
            sender.value = "Salvar";
        }
        //O usuario ja alterou os dados, entao pode enviar a requisicao para o banco
        else if (trPai.children[1].innerHTML.toLowerCase().indexOf("input") != -1) {

            //Resgata os valores da tela
            var marca = trPai.children[1].children[0].value;
            var modelo = trPai.children[2].children[0].value;
            var ano = trPai.children[3].children[0].value;

            //Envia a requisicao para alterar no banco de dados
            xmlhttp.open("PUT", "api.php/carros/id=" + id, true);
            xmlhttp.send("{\"NOME_MARCA\":\"" + marca + "\",\"NOME_MODELO\":\"" + modelo + "\",\"ANO\":\"" + ano + "\"}");

            //Retira o input
            $(trPai.children[1]).replaceWith("<td>" + marca + "</td>");
            $(trPai.children[2]).replaceWith("<td>" + modelo + "</td>");
            $(trPai.children[3]).replaceWith("<td>" + ano + "</td>");

            sender.className = "js_input btn btn-outline-info";
            sender.value = "Editar";
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
    inputMarca.placeholder = "Marca";
    inputMarca.className = "js-add_input form-control";
    divPai.appendChild(inputMarca);

    var inputModelo = document.createElement('input');
    inputModelo.type = "text";
    inputModelo.placeholder = "Modelo";
    inputModelo.className = "js-add_input form-control";
    divPai.appendChild(inputModelo);

    var inputAno = document.createElement('input');
    inputAno.type = "text";
    inputAno.placeholder = "Ano";
    inputAno.className = "js-add_input form-control";
    divPai.appendChild(inputAno);

    var btnAdicionar = document.createElement('input');
    btnAdicionar.type = "button";
    btnAdicionar.value = "Adicionar Carro";
    btnAdicionar.className = "js_button btn btn-outline-success";
    btnAdicionar.id = "btnAdicionar" + Math.floor(Math.random() * 50) + 1;
    divPai.appendChild(btnAdicionar);
    $("#" + btnAdicionar.id).click(function () {
        AdicionarCarro(this);
    });

    var btnCancelar = document.createElement('input');
    btnCancelar.type = "button";
    btnCancelar.value = "Cancelar";
    btnCancelar.className = "js_button btn btn-outline-secondary";
    btnCancelar.id = "btnCancelar" + Math.floor(Math.random() * 50) + 1;
    divPai.appendChild(btnCancelar);
    $("#" + btnCancelar.id).click(function () {
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
            BuscarCarro(marca, "");
        }, 1000);
    }
}
//========================================================================

//Funções de apoio
//========================================================================
function CopiarConteudo(IdOrigem, IdDestino) {
    var origem = document.getElementById(IdOrigem.id);
    var destino = document.getElementById(IdDestino.id);

    if (origem.innerHTML !== "") {
        destino.innerHTML = origem.innerHTML;
        origem.innerHTML = "";
    }
}

function LimparFiltro() {
    var chave_busca = "";
    BuscarCarro(chave_busca, "");
    document.getElementById("txtBusca").value = "";
    document.getElementById("search_concept").innerHTML = "Filtros";
}

function ProcessaFiltro(sender) {

    //Pega o que esta na barra de busca
    var chave_busca = document.getElementById("txtBusca").value;
    var filtro = "";

    //Verifica qual o filtro escolhido e monta um json
    switch (sender.id) {
        case "filtroMarca":
            filtro = { "tipo": "marca", "asc": "true" };
            break;
        case "filtroModelo":
            filtro = { "tipo": "modelo", "asc": "true" };
            break;
        case "filtroAno":
            filtro = { "tipo": "ano", "asc": "true" };
            break;
        case "filtroTudo":
            filtro = { "tipo": "tudo", "asc": "true" };
            break;
        default:
            filtro = { "tipo": "tudo", "asc": "true" };
            break;
    }

    if (filtro !== "") {
        document.cookie = "filtroTipo=" + filtro.tipo;
        document.cookie = "filtroAsc=" + filtro.asc;
        BuscarCarro(chave_busca, filtro);
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function zeraCookie() {
    document.cookie = "filtroTipo=";
    document.cookie = "filtroAsc=";
}

function isNumero(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
//========================================================================
