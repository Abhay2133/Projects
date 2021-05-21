<?php

	//echo "Inside server.php\n";
	$data = json_decode(file_get_contents("php://input"));
	$value = "";
	
	if( isset($_GET["data"]) )
		$value = $_GET["data"];
	else
		$value = $data->data;
		
   echo "data : ".$value."<br>";
   
?>