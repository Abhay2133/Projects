const se = (key, val) => {
        switch (key) {
            
 case 'i': return document.getElementById(val);
    break;
 case 'c': return document.getElementsByClassName(val);
    break;
 case 't': return document.getElementsByTagName(val);
    break;
    
        }
        
        return 0;
    }

const ses = (str, callback) => {

let arr = [...str];
let key = arr[0];
arr.shift()
let val = arr.join("");

        switch (key) {
            
 case '#': return document.getElementById(val);
    break;
 case '.': return document.getElementsByClassName(val);
    break;
 default : return document.getElementsByTagName(val);
    break;
    
        }
        
if(callback)
    callback ();
        
        return 0;
    }  
  
function ae(el,event, method, params, callback)
{
    el.addEventListener(event, function (){
        method(this, params);
    });
    
    if(callback)
    callback();
}

function css(el, props, callback)
{

    for (let i in props)
        el.style[i] = props[i];

    if (callback)
        callback();
}

var pre_el;
function toggle (el, flag)
{
	let c = el.parentElement.children;

	if(pre_el && pre_el != el)
		hidenones(pre_el)
	
	for(let i of c)
	{
		let clsi = i.className.split(" ");
		if(clsi.includes("none") || clsi.includes("h-n"))
			if(i.style.display != "block" || i.style.height != "108px")
				{i.style.display = "block";
				 i.style.height = "108px";
				}
			else
				{i.style.display = "none";
				 i.style.height = "0px";
				}
	}
		if(flag)
	{
		pre_el = el;
	}
	else
		pre_el = 0;
	
}

function hidenones(el)
{
	let c = el.parentElement.children;
	for(let i of c)
	{
		let clsi = i.className.split(" ");
		if(clsi.includes("none"))
				i.style.display = "none";
	}
}

function hidEl(...el)
{
	for(let i of el)
		i.style.display = "none";
}

function unhidEl(...el)
{
	for(let i of el)
		i.style.display = "block";
}

function getHeight (self)
{
	let h = 0
	fs = self.style.fontSize
	p = self.style.padding
	m = self.style.margin
	bdrT = self.style.borderTopSize
	bdrB = self.style.borderBottomSize
	if(!fs)
	{
		fs = document.body.style.fontSize;
	}
	
	fs = fs ? parseInt(fs.replace("px", "")) : parseInt("0")
	p = p ? parseInt(p.replace("px", "")) : parseInt("0")
	m = m ? parseInt(m.replace("px", "")) : parseInt("0")
	bdrT = bdrT ? parseInt(bdrT.replace("px", "")) : parseInt("0")
	bdrB = bdrB ? parseInt(bdrB.replace("px", "")) : parseInt("0")

	h = fs + p + p + m + m + bdrT + bdrB;
	console.log('fs : %i, p : %i, m: %i, bdrB: %i, bdrT: %i, h : %i', fs, p,m, bdrB, bdrT, h)
	
	return h+1;
}

function toggleSlide (el)
{
	let c = el.children;
	//Calcukate height
	h = 0
	for(let i of c)
		h += getHeight(i)
	h += "px";
	el.style.transition = '0.2s';
	
	if(el.style.height != h)
		el.style.height = h
	else
		el.style.height = "0px"
		
}




















