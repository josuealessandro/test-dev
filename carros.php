<?php
session_start();
include 'Carro.class.php';
$classe = new Carro;

if($_GET['id'] != ''){
	if($_POST['editar'] == 'S'){
		$dados = array('modelo' => $_POST['modelo'], 'marca' => $_POST['marca'], 'ano' => $_POST['ano']);
		$retorno = $classe->editar($_GET['id'],$dados);
		$_SESSION['erro'] = $retorno;
		echo "<script>$('#telapreta').fadeOut();$('#conteudo2').fadeOut();$('#conteudo').load('carros/');</script>";
	}elseif($_POST['deletar'] == 'S'){
		$retorno = $classe->deletar($_GET['id']);
		$_SESSION['erro'] = $retorno;
		echo "<script>$('#conteudo').load('carros/');</script>";
	}else{
		
	}
}else{
	if($_POST['cadastrar'] == 'S'){
		$dados = array('modelo' => $_POST['modelo'], 'marca' => $_POST['marca'], 'ano' => $_POST['ano']);
		$retorno = $classe->cadastrar($dados);
		$_SESSION['erro'] = $retorno;
		echo "<script>$('#telapreta').fadeOut();$('#conteudo2').fadeOut();$('#conteudo').load('carros/');</script>";
	}else{
		$retorno = $classe->listar();
		
		if($_SESSION['erro'] != ''){
			echo '<br><span class="error strong">'.$_SESSION['erro'].'</span><br>';
			
			$_SESSION['erro'] = '';
		}
		
		?>
		<br><br>
		<p class="pad10 bgcinz1 strong">
			<span class="wdth25 block left">Marca</span>
			<span class="wdth25 block left">Modelo</span>
			<span class="wdth15 block left">Ano</span>
			<span class="right"><a href="javascript:;" onclick="cadNovo();">Novo Carro</a></span>
			<span class="clear">&nbsp;</span>
		</p>
		<?
		$i = 1;
		foreach($retorno as $id => $carro){
			$carro = (array) $carro;
			$cls = 'bgcinz2';
			if($i == 2){
				$cls = 'bgbranc';
				$i = 0;
			}
			$i++;
			?>
			<p class="pad10 <?=$cls?> clear">
				<span class="wdth25 block left"><?=$carro['marca']?></span>
				<span class="wdth25 block left"><?=$carro['modelo']?></span>
				<span class="wdth15 block left"><?=$carro['ano']?></span>
				<span class="right"><a href="javascript:;" onclick="edita(<?=$id?>);">Editar</a> | <a href="javascript:;" onclick="deleta(<?=$id?>);">Excluir</a></span>
				<span class="clear">&nbsp;</span>
			</p>
			<?
		}
	}
}
