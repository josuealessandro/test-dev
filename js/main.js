function BuscarCarro(str) {
    if (str == "") {
        document.getElementById("txtBuscaCarro").innerHTML = "";
        return;
    } else {
		if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
				var arrayResult = jQuery.parseJSON(this.responseText);
				var content = "";
				
				if(arrayResult.length !== 0)
				{
					$.each(arrayResult,function(i, item){
						content +='<span id="' + item.ID_CARRO + '">' + item.NOME_MARCA + ' - ' + item.NOME_MODELO + '<br /></span>';
					});
				}
				else { content = ""; }
				
                document.getElementById("txtBuscaCarro").innerHTML = content;
            }
        };
        xmlhttp.open("GET", "api.php/carros/search?marca=" + str + '&modelo=' str, true);
        xmlhttp.send();
    }
}

function CopiarConteudo(IdOrigem, IdDestino)
{
	var origem = document.getElementById(IdOrigem.id);
	var destino = document.getElementById(IdDestino.id);
	
	if(origem.innerHTML !== "")
	{
		destino.innerHTML = origem.innerHTML;
	}
}
