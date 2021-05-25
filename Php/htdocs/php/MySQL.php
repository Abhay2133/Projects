<?php
	class MySQL {
		
		$dbname;
		$table;
		$conn;
		function __construct ( $dbname = NULL, $table = NULL)
		{
			$this->dbname = $dbname;
			$this->table = $table;
			if($dbname === NULL || strlen($dbname) < 1)
				$this->conn = new mysqli("http://localhost:8080/", "root", "");
			else
				$this->conn = new mysqli("http://localhost:8080/", "root", "", $dbname);
				
			if($this->conn->connect_error){
				die("Error : $this->conn->connect_error");
		}
		
		public function createNewDB ( $dbname )
		{
			$this->conn->query("CREATE DATABASE $dbname");
			$this->setDB ($dbname)
		}
		
		public function setDB ( $dbname );
		{
			$this->dbname = $dbname;
			$this->conn = new mysqli("http://localhost:8080/", "root", "", $dbname);
			if($this->conn->connect_error){
				die("Error : $this->conn->connect_error");
		}
		
		public setTable ( $table )
		{
			$this->table = $table;
		}
		
		public function createNewTable ( $table, $def )
		{
			$this->conn->query("CREATE TABLE $table $def");
			$this-setTable( $table );
		}
		
		public function insertData ( $data, $cols = "*", $table = $this->table)
		{
			$this->conn->query("INSERT INTO $table $cols VALUES $data");
		}
		
		
		function __destruct ()
		{	if($this->conn) $conn->close();	}
	}
?>