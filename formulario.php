<? 
$contmarcas = file_get_contents('marcas.txt');
$marcas = json_decode($contmarcas);
sort($marcas);
?>
<form method="post" action="carros/<?=$_GET['id']?>" id="formulario">
	<input type="hidden" name="id" value="<?=$_GET['id']?>">
	<? 
	if($_GET['id'] != ''){
		$contcarros = file_get_contents('carros.txt');
		$carros = (array) json_decode(str_replace('|','"',$contcarros));
		$carro = $carros[$_GET['id']];
		$carro = (array) $carro;
		$carmarca =  $carro['marca'];
		$carmodelo = $carro['modelo'];
		$carano = $carro['ano'];
		
		?>
		<input type="hidden" name="editar" value="S">
		<?
	}else{
		?>
		<input type="hidden" name="cadastrar" value="S">
		<?
	}
	?>	
	<p class="pad10"><label for="marca">Marca</label>
	<select name="marca" required class="pad10 bgbranc">
		<option value="">Escolha uma Marca</option>
		<? 
		foreach ($marcas as $marca) {
			$selected = '';
			if($carmarca == $marca){
				$selected = 'selected = "selected"';
			}
			?>
			<option value="<?=$marca?>" <?=$selected?>><?=$marca?></option>
			<?
		}
		?>
	</select>
	</p>
	<p class="pad10">
	<label for="modelo">Modelo</label>
	<input type="text" name="modelo" value="<?=$carmodelo?>" required class="pad10 bgbranc">
	</p>
	<p class="pad10">
	<label for="ano">Ano</label>
	<input type="year" name="ano" value="<?=$carano?>" required class="pad10 bgbranc">
	</p>
	<p class="pad10"><input type="submit" value="Salvar" class="pad10 bgcinz2" /> <input type="button" value="Cancelar" onclick="cancela();"class="pad10 bgcinz2" /></p>
</form>
<script>
	$(document).ready(function() { 
	    var options = { 
	        target:        '#conteudo2',
	    }; 
	  
	    $('#formulario').ajaxForm(options); 
	}); 
</script>