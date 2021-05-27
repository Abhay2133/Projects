<?php
	class PDOmysql {
		public $dbname;
		public $table;
		public $conn;
		public $host;
		function __construct ( $dbname = NULL, $table = NULL)
		{
			$this->host = "localhost";
			$this->dbname = $dbname;
			$this->table = $table;
			
			if(!$this->hasDB() && strlen($dbname) > 0){
				$this->createNewDB( $dbname );
			}
		}
		
		public function connect ( $dbname = null )
		{
			$conn_str;
			if(strlen($dbname) > 0)
				$conn_str = "mysql:host=$this->host;dbname=$dbname";
			else
				$conn_str = "mysql:host=$this->host";
				
			try {
				$conn = new PDO($conn_str , "root", "");
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} 
			catch(PDOException $e) {
 				echo "Connection failed : " . $e->getMessage();
			}
		}
		
		public function query( $sql , $returnFlag = false, $dbname = null , $use_default_db = true)
		{
			try {
				if($dbname === null && $use_default_db )
					$dbname = $this->dbname;
				
				$conn = $this->connect ( $dbname );
				$stmt = $conn->prepare ( $sql );
				$conn = null;
				$stmt->execute();
				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				if($returnFlag)
					return $stmt->fetchAll();
			} 
			catch(PDOException $e) {
 				return array("error_mess"  => $e->getMessage(),
 									  "error_code" => $e->getCode());
			}
		}
		
		public function createNewDB ( $dbname , $setActive = true )
		{
			$this->query("CREATE DATABASE $dbname");
			if( $setActive )
				$this->setDB ($dbname);
		}
		
		public function createNewTable ( $def , $table = NULL, $setActive = true)
		{
			if( $table == NULL )
				$table = $this->table;
			if( $this->hasTable( $table ))
				return "Table '$table' already exists ! ";
			$this->query("CREATE TABLE $table $def");
			if($setActive)
				$this->setTable( $table );
			return "Table '$table' generated ! ";
		}
		
		public function setDB ( $dbname )
		{
			$this->dbname = $dbname;
		}
		
		public function setTable ( $table )
		{
			$this->table = $table;
		}
		
		public function insert ( $data, $cols, $debug)
		{
			$sql = "INSERT INTO $this->table $cols VALUES $data";
			if($debug == true){
				echo "SQL : ";
				print_r($sql);
			}
			return $this->query($sql);
		}
		
		public function hasDB ()
		{
			$query = $this->query("Show Databases", true, null, false);
			if (count($query) > 0) {
				foreach ( $query as $row) {
					if($this->dbname === $row["Database"])
   						return true;
				}
			}
			return false;
		}
		
		public function hasTable ( $table = NULL)
		{
			if( $table == NULL )
				$table = $this->table;
				
			$query = $this->query("show tables;", true);
			
			if (count($query) > 0) {
				foreach ( $query as $row) {
					if($table === $row["Tables_in_$this->dbname"])
   					return true;
				}
			}
			return false;
		}
		
		public function select ( $cols = "*", $condition = null, $debug = false)
		{
			$sql = " SELECT $cols FROM $this->table ";
			$sql .= (strlen($condition) > 1) ? "WHERE $condition" : "";
			if($debug)
				echo $sql;
			return $this->query( $sql , true);
		}
		
		public function update ( $col_val, $condition )
		{
			return $this->query("UPDATE $this->table SET $col_val WHERE $condition");
		}
		
		public function deleteRow ( $condition , $table = null )
		{
			if( $table === null )
			{
				$table = $this->table;
			}
			return $this->query("DELETE FROM $table WHERE $condition");
		}
		
	}
?>