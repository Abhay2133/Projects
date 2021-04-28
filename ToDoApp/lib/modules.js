function st (str, cb) // st means select a Tag
{
	var str_a = str[0];
	var req_tag = null;
	switch (str_a)
	{
		case "#" : req_tag = document.getElementById(str.substring(1));
			break;
		case "." : req_tag = document.getElementsByClassName(str.substring(1));
			break;
		default : req_tag = document.getElementsByTagName(str.substring(1));
	}
	
	if(cb)
		cb ();
	
	return req_tag;
}