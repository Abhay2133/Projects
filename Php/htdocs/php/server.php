<?php

	require "MySQL.php";
	$data = json_decode(file_get_contents("php://input"));

	$json = array("status" => 200);
	
	if($_REQUEST["signup"])
	{
		$uid = $data->uid;
		$pswrd = $data->pswrd;
		$json["debug"] = strlen($uid).", ".strlen($pswrd);
		if(strlen($uid) < 5 || strlen($pswrd) < 5){
			//$json["uid & password length Checker"] = "true";
			$json["snackbar_error"] = "Username and Password cannot be shorter than 5 letters";
			$json["status"] = 400;
			echo json_encode($json);
			return;
		}
		
		$users = new MySQL("Users_Details");

		if( $users->searchCol("uid", $uid)["pos"]){
			$json["snackbar"] = "Username is already Taken ";
		}
		/*
		else {
			
			$json["snackbar"] = $users->add("$uid,$pswrd,NULL");
			$json["status"] = 200;
		}
	}
	else
	if($_REQUEST["read"])
	{
		$db->read2json();
	}
	else
	if($_REQUEST["login"]){
		$uid = $data->uid;
		$pswrd = $data->pswrd;
		
		if( $db->searchCol("uid", $uid) && $db->searchCol("pswrd", $pswrd) )
		{
			$json["snackbar"] =  "Login Success !";
			$json["status"] = 200;
		}
		else{
			$json["snackbar"] =  "Username or password is wrong ! ";
			$json["status"] = 403;
		}
	}
	else
	if(strlen($_GET["hasuid"])){
		$uid = $_GET["hasuid"];
		$debug = $_GET["debug"];
		
		$db = new DB("users.csv");
		$search_data = $db->searchCol("username", $uid, $debug);
		//print_r($search_data);
		if($search_data["pos"] > 0)
		{
			$json["uid_info"] = "Username already taken !";
			$json["status"] = 409;
		}
		else
		{
			$json["uid_info"] = "Username available";
			$json["status"] = 200;
		}
	}
	else
	if( $_REQUEST["update"])
	{
		$old_data = $data->od;
		$new_data = $data->nd;
		$col = $data->col;
		$json["success"] = $db->update ($col, $old_data, $new_data, $_REQUEST["debug"]);
	}
	*/
	echo json_encode($json);
?>