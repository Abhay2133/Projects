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

function pop(tag)
{
  let ms = 100;
  let sec = ms / 1000;
  tag.style.transition = sec + "s";
  setTimeout(function() {
    tag.style.transform = "scale(0.8)";
    setTimeout(function() {
      tag.style.transform = "scale(1)"
    }, ms)
  }, 20)
}