function submit (tag, method) {
	
	var obj = {
		data : tag.value
	};
	
	var xhttp = new XMLHttpRequest();
	
	if(method == "POST")
	{
		xhttp.open(method , `http://localhost:8080/php/server.php`, true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(JSON.stringify(obj));
	}
	else
	{
		xhttp.open(method , `http://localhost:8080/php/server.php?data=${tag.value}`, true);
		xhttp.send();
	}
		xhttp.onreadystatechange = function (){
		console.log(this.readyState);
		if(this.readyState == 4 )
			data.innerHTML += this.responseText
	}
}

function sendData ()
{
	let url = `http://localhost:8080/php/server.php`
    ajax(url, {data : "Abhay"}, function (){
		if(this.readyState == 4)
			data.innerHTML += this.responseText;
	});
}
