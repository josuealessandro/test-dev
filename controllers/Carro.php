<?php
namespace controllers {
	class Carro {
		
		private $PDO;

		//DB Connection
		function __construct(){
			$this->PDO = new \PDO('mysql:host=localhost;dbname=api', 'root', '');
			$this->PDO->setAttribute( \PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION );
		}
		
		//Select
		public function select($search = null){
			global $app;
						
			//Select all if search is null
			if($search == null)
			{
				$sth = $this->PDO->prepare("SELECT * FROM pessoa");
			}
			else 
			{
				if(isset($_GET['id']))
				{
					//Select by ID
					$sth = $this->PDO->prepare("SELECT * FROM pessoa WHERE id = :id");
					$sth ->bindValue(':id',($_GET['id']));					
				}
				else if (isset($_GET['nome']))
				{
					//Select by Name
					$sth = $this->PDO->prepare("SELECT * FROM pessoa WHERE nome like :nome");
					$sth ->bindValue(':nome','%'.($_GET['nome']).'%');
				}
			}
			if($sth !== "")
			{
				$sth->execute();
				$result = $sth->fetchAll(\PDO::FETCH_ASSOC);				
			}
			//Return data
			$app->render('default.php',["data"=>$result],200);
		}
		
		//Insert
		public function insert(){
			global $app;
			$dados = json_decode($app->request->getBody(), true);
			$dados = (sizeof($dados)==0)? $_POST : $dados;
			$keys = array_keys($dados); //Paga as chaves do array
			$sth = $this->PDO->prepare("INSERT INTO pessoa (".implode(',', $keys).") VALUES (:".implode(",:", $keys).")");
			foreach ($dados as $key => $value) {
				$sth ->bindValue(':'.$key,$value);
			}
			$sth->execute();
			//Return ID
			$app->render('default.php',["data"=>['id'=>$this->PDO->lastInsertId()]],200); 
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

			$sth = $this->PDO->prepare("UPDATE pessoa SET ".implode(',', $sets)." WHERE id = :id");
			$sth ->bindValue(':id',$id);
			foreach ($dados as $key => $value) {
				$sth ->bindValue(':'.$key,$value);
			}
			//Return status
			$app->render('default.php',["data"=>['status'=>$sth->execute()==1]],200); 
		}
		
		//Delete
		public function del($id){
			global $app;
			$sth = $this->PDO->prepare("DELETE FROM pessoa WHERE id = :id");
			$sth ->bindValue(':id',$id);
			//Return status
			$app->render('default.php',["data"=>['status'=>$sth->execute()==1]],200); 
		}
	}
}
?>