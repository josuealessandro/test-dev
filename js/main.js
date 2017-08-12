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
						content +='<span id="' + item.id + '">' + item.nome + '<br /></span>';
					});
				}
				else { content = ""; }
				
                document.getElementById("txtBuscaCarro").innerHTML = content;
            }
        };
        xmlhttp.open("GET", "api.php/carros/search?nome=" + str, true);
        xmlhttp.send();
    }
}

function ExcluirCarro(str) {
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
						content +='<span id="' + item.id + '">' + item.nome + '<br /></span>';
					});
				}
				else { content = ""; }
				
                document.getElementById("txtBuscaCarro").innerHTML = content;
            }
        };
        xmlhttp.open("DELETE", "api.php/carros/id=" + str, true);
        xmlhttp.send();
    }
}

function ExcluirCarro(str) {
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
						content +='<span id="' + item.id + '">' + item.nome + '<br /></span>';
					});
				}
				else { content = ""; }
				
                document.getElementById("txtBuscaCarro").innerHTML = content;
            }
        };
        xmlhttp.open("DELETE", "api.php/carros/id=" + str, true);
        xmlhttp.send();
    }
}