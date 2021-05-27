<?php

	require "PDO.php";
	$data = json_decode(file_get_contents("php://input"));

	$res = array("status" => 200);
	
	if($_REQUEST["signup"])
	{
		$uid = $data->uid;
		$pswrd = $data->pswrd;
		$pswrd = password_hash($pswrd, PASSWORD_DEFAULT);
		$time = time();
		$loginToken = bin2hex(random_bytes(10));
		$users = new PDOmysql ("users", "users_details");
		$res["table"] = $users->createNewTable("(uid varchar(10) PRIMARY key,
			pswrd varchar(255) not null,
			loginToken varchar(10), 
			lastLoginTime int(20)
		)");
		$res["data"] = $users->insert("(\"$uid\", \"$pswrd\", \"$loginToken\", $time)", "(uid, pswrd, loginToken, lastLoginTime)", $_REQUEST["debug"]);
	}
	else
	if( $_REQUEST["genToken"] )
	{
		$token = bin2hex(random_bytes(10));
		$res["token"] = $token;
	}
	else
	if( $_REQUEST["login"] )
	{
		$uid = $data->uid;
		$pswrd = $data->pswrd;
		$users = new PDOmysql ("users", "users_details");
		$select = $users->select ("uid, pswrd", "uid = \"$uid\"", $_REQUEST["debug"]);
		if( count($select) > 0)
		{
			$res["loginSuccess"]  = password_verify( $pswrd, $select[0]["pswrd"]) ? true : false;
			if($res["loginSuccess"]){
				$token = bin2hex(random_bytes(10));
				$time = time();
				$res["update"] = $users->update("loginToken = \"$token\", lastLoginTime = $time", "uid = \"$uid\"");
				$res["update"] = $res["update"] ? $res["update"] : "Token Updated";
				$res["token"] = $token;
				$res["time"] = $time;
			}
			else{
				$res["error"] = "Wrong Password !";
			}
		}
		else{
			$res["loginSuccess"]  = false;
			$res["error"]  = "Wrong Username !";
		}
	}
	else
	if($_REQUEST["autoLogin"])
	{
		$token = $data->token;	$token_time = $data->time;
		$cur_time = time();
		$res["token"] = $token;
		$res["autoLogin"] = false;
		if(strlen($token) < 10)
		{
			$res["error"] = "token length is short !";
		}
		else
		if(($cur_time - $token_time) > 2592000 && strlen($token) >= 10)
		{
			$res["error"] = "token expired !";
		}
		else
		if(($cur_time - $token_time) < 2592000 && strlen($token) >= 10)
		{
			$users = new PDOmysql ("users", "users_details");
			$loginTokens = $users->select("loginToken");
			foreach($loginTokens as $loginToken)
			{
				if($loginToken["loginToken"] == $token){
					$users->update("lastLoginTime = $cur_time", "loginToken = \"$token\"");
					$res["autoLogin"] = true;
					break;
				}
			}
			if(!$res["autoLogin"])
				$res["error"] = "Invalid Token !";
		}
		else {
			$res["error"] = "unknown";
		}
	}
	else
	if( $_REQUEST["deleteUser"])
	{
		$res["deleteUser"] = false;
		$uid = $data->uid;
		$pswrd = $data->pswrd;
		$users = new PDOmysql ("users", "users_details");
		$select = $users->select ("uid, pswrd", "uid = \"$uid\"", $_REQUEST["debug"]);
		if( count($select) > 0)
		{
			$res["loginSuccess"]  = password_verify( $pswrd, $select[0]["pswrd"]) ? true : false;
			if($res["loginSuccess"]){
				$delRes = $users->deleteRow("uid = \"$uid\"");
				$res["deleteUser"] = $delRes ? $delRes : true;
			}
			else{
				$res["error"] = "Wrong Password !";
			}
		}
		else
		{
			$res["error"] = "invalid username !";
		}
	}
	
	
	echo json_encode($res);
?>