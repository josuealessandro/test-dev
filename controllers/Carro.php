<?php
namespace controllers {
	class Carro {
		
		private $PDO;

		//DB Connection
		function __construct(){
			$this->PDO = new \PDO('mysql:host=localhost;dbname=db.carro', 'root', '');
			$this->PDO->setAttribute( \PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION );
		}
		
		function verifica_string ($str, $valorPrimario, $valorSecundario): string
		{		
			//Busca um valor primario dentro da string. Se encontrar, insere o valor secundario
			if(strpos($str, $valorPrimario))
			{
				$str .= $valorSecundario;
			}
			//Se nao encontrar o valor primario dentro da string, insere o valor primario
			else
			{
				$str .= $valorPrimario;
			}
			
			return $str;
		}
		
		//Select
		public function select($search = null){
			global $app;
						
			//Seleciona tudo caso nao haja filtro de busca
			if($search == null)
			{
				$sth = $this->PDO->prepare("SELECT * FROM TB_CARRO");
			}
			else 
			{
				//Coloca os parametros da requisicao em caixa baixa para nao haver erros
				$filter = array_change_key_case($_GET);
				$sql = "SELECT * FROM TB_CARRO ";
				
				//Muda o tipo de busca no banco caso tiver vários filtros
				if(count($filter) > 1 && !isset($filter['conector']))
				{
					$tipoBusca = "OR";
				}
				else if(count($filter) > 1 && isset($filter['conector']))
				{
					$tipoBusca = $filter['conector'];
				}
				else
				{
					$tipoBusca = "";
				}
				
				//Verifica se a requisição possui o parâmetro Id
				if(isset($filter['id']) && $filter['id'] !== '')
				{
					//Seleciona por ID_CARRO
					$sql = $this->verifica_string($sql, "WHERE", $tipoBusca);
					$sql .= " ID_CARRO = ".$filter['id']." ";
				}
				//Verifica se a requisição possui o parâmetro Marca
				if (isset($filter['marca']) && $filter['marca'] !== '')
				{
					//Seleciona por NOME_MARCA
					$sql = $this->verifica_string($sql, "WHERE", $tipoBusca);
					$sql .= " NOME_MARCA LIKE '%".$filter['marca']."%' ";
				}
				//Verifica se a requisição possui o parâmetro Modelo
				if (isset($filter['modelo']) && $filter['modelo'] !== '')
				{
					//Seleciona por NOME_MODELO
					$sql = $this->verifica_string($sql, "WHERE", $tipoBusca);
					$sql .= " NOME_MODELO LIKE '%".$filter['modelo']."%' ";
				}
				//Verifica se a requisição possui o parâmetro Ano
				if (isset($filter['ano']) && $filter['ano'] !== '')
				{
					$anoIni = "0";
					$anoFim = "0";
					
					//A pesquisa pode ser tanto por um ano especifico ou por uma faixa de ano (Ex: de 2015 à 2018)
					if(strpos($filter['ano'], '-'))
					{	
						//Pesquisa por faixa de ano
						$faixaAno = explode("-", $filter['ano']);						
					}
					else
					{
						//Pesquisa por ano especifico
						$faixaAno = $filter['ano'];
					}
										
					if (count($faixaAno) == 1)//Pesquisa por ano especifico
					{
						$anoIni = $faixaAno;
						$anoFim = $anoIni;
					}
					else if (count($faixaAno == 2))//Pesquisa por faixa de ano
					{
						if($faixaAno[0] < $faixaAno[1])
						{
							 $anoIni = $faixaAno[0];
							 $anoFim = $faixaAno[1];
						}
						else
						{
							 $anoIni = $faixaAno[1];
							 $anoFim = $faixaAno[0];
						}
					}
					//Monta a query e substitui os valores
					$sql = $this->verifica_string($sql, "WHERE", $tipoBusca);
					$sql .= " ANO >= ".$anoIni." AND ANO <= ".$anoFim." ";
				}
				//Configura a ordenacao de exibicao
				if (isset($filter['orderby']) && $filter['orderby'] !== '')
				{
					switch($filter['orderby'])
					{
						case "id":
							$sql .= " ORDER BY ID_CARRO ";
							break;
							
						case "marca":
							$sql .= " ORDER BY NOME_MARCA ";
							break;
							
						case "modelo":
							$sql .= " ORDER BY NOME_MODELO ";
							break;
							
						case "ano":
							$sql .= " ORDER BY ANO ";
							break;
						
						default:
							$sql .= " ORDER BY ID_CARRO ";
							break;
					}
					// asc = order ascendente / desc = order descendente
					if (isset($filter['asc']) && $filter['asc'] !== '')
					{
						if($filter['asc'] == "true")
						{
							$sql .= " ASC ";
						}
						else 
						{ 
							$sql .= " DESC ";
						}
					}
				}
				// var_dump($sql);
				// die();
				$sth = $this->PDO->prepare($sql);				
			}
			if($sth !== "")
			{
				$sth->execute();
				$result = $sth->fetchAll(\PDO::FETCH_ASSOC);
			}
			//Retorna os dados
			$app->render('default.php',["data"=>$result],200);
		}
		
		//Insert
		public function insert(){
			global $app;
			$dados = json_decode($app->request->getBody(), true);
			$dados = (sizeof($dados)==0)? $_POST : $dados;
			$keys = array_keys($dados); //Paga as chaves do array
			$sth = $this->PDO->prepare("INSERT INTO TB_CARRO (".implode(',', $keys).") VALUES (:".implode(",:", $keys).")");
			foreach ($dados as $key => $value) {
				$sth ->bindValue(':'.$key,$value);
			}
			$sth->execute();
			//Retorna o ID do carro
			$app->render('default.php',["data"=>['ID_CARRO'=>$this->PDO->lastInsertId()]],200); 
		}
		
		//Update
		public function update($id){
			global $app;
			$dados = json_decode($app->request->getBody(), true);
			$dados = (sizeof($dados)==0)? $_POST : $dados;
			$sets = [];
			foreach ($dados as $key => $VALUES) {
				$sets[] = $key." = :".$key;
			}

			$sth = $this->PDO->prepare("UPDATE TB_CARRO SET ".implode(',', $sets)." WHERE ID_CARRO = :ID");
			$sth ->bindValue(':ID',$id);
			foreach ($dados as $key => $value) {
				$sth ->bindValue(':'.$key,$value);
			}
			//Retorna status - true = alterado / false = nao alterado 
			$app->render('default.php',["data"=>['status'=>$sth->execute()==1]],200); 
		}
		
		//Delete
		public function del($id){
			global $app;
			$sth = $this->PDO->prepare("DELETE FROM TB_CARRO WHERE ID_CARRO = :ID");
			$sth ->bindValue(':ID',$id);
			//Retorna status - true = alterado / false = nao alterado 
			$app->render('default.php',["data"=>['status'=>$sth->execute()==1]],200); 
		}
	}
}
?>