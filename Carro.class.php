<?php
/**
* Classe do carro
*/

class Carro{
	
	function listar(){
		$contcarros = file_get_contents('carros.txt');
		$carros = (array) json_decode(str_replace('|','"',$contcarros));
		return $carros;
	}
	
	function cadastrar($dados){
		$contcarros = file_get_contents('carros.txt');
		$carros = (array) json_decode(str_replace('|','"',$contcarros));
		
		foreach($carros as $carro){
			$carro = (array) $carro;
			if($carro['marca'] == $dados['marca'] and $carro['modelo'] == $dados['modelo'] and $carro['ano'] == $dados['ano']){
				return 'Esse carro j&aacute; foi cadastrado!';
			}
		}
		$carros[] = $dados;
		$jsncarro = str_replace('"','|',json_encode($carros));
		
		$fp = fopen("carros.txt",w);
		$escreve = fwrite($fp, $jsncarro);
		fclose($fp);
		
		return 'O carro '.$dados['modelo'].' foi cadastrado com sucesso!';
	}
	
	function editar($id,$dados){
		$contcarros = file_get_contents('carros.txt');
		$carros = (array) json_decode(str_replace('|','"',$contcarros));
		
		$carros[$id] = $dados;
		$jsncarro = str_replace('"','|',json_encode($carros));
		
		$fp = fopen("carros.txt",w);
		$escreve = fwrite($fp, $jsncarro);
		fclose($fp);
		
		return 'O carro '.$dados['modelo'].' foi editado com sucesso!';
	}
	
	function deletar($id){
		$contcarros = file_get_contents('carros.txt');
		$carros = (array) json_decode(str_replace('|','"',$contcarros));
		
		$dados = (array) $carros[$id];
		
		unset($carros[$id]);
		
		$jsncarro = str_replace('"','|',json_encode($carros));
		
		$fp = fopen("carros.txt",w);
		$escreve = fwrite($fp, $jsncarro);
		fclose($fp);
		
		return 'O carro '.$dados['modelo'].' foi deletado com sucesso!';
	}
}
?>