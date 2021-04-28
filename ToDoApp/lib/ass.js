/*

Developed by Abhay Bisht
It uses Javascript to scan each tag's classs and appiled style to that tag according to the class specific combination

To use it in ur project just email me at abhaybishthestudent@gmail.com

*/

function css(el, props, callback)
{

    for (let i in props)
      {  el.style[i] = props[i];
         // console.log(el.class +"=>"+i+":"+props[i])
      }

    if (callback)
        callback();
}

const prop1 = {
    p : "padding",
    m : "margin",
    rc : "borderRadius",
    d : "display",
    bdr : "border",
    t : "textAlign",
    w : "width",
    h : "height",
    f : "fontSize",
    bg : "background"
}

const prop2 = {
    T : "Top",
    B : "Bottom",
    L : "Left",
    R : "Right",
    lg : "",	//lg for Linear Gradient
	C : "Color"
}

const val = {
    xxs : "1px",
    xs : "3px",
    s : "5px",
    l : "15px",
    xl : "20px",
    xxl : "25px",
    xxxl : "30px",
    no : "none",
    b : "block",
    ib : "inline-block",
    c : "center",
    lft : "left",
    r : "right",
    "100" : "100%",
    drk : "#333",
    n : "0px"
}

const def = "10px";

const spProp = {
    "f-c-c" : {
        display : "flex", 
        flexDirection : "column",
        justifyContent : "center"
    },
    "f-r-c" : {
        display : "flex", 
        flexDirection : "row",
        justifyContent : "center"
    },
    bb : {
        boxSizing : "border-box"
    },
    bnw : {
        backgroundColor : "#333",
        color: "white"
    },
    bold : {
        fontWeight : "500"
    },
    bolder : {
        fontWeight : "900"
    },
    "bold-n" : {
        fontWeight : "100",
        color: "grey"
    },
    bdr : "1px solid black"
}

function apply_CSS (cb)
{
    let body = document.body;
    let bc = body.children

    apply_style(body, body.className.split(" "))
    loop(bc)
    
    if(cb)
        cb();
}

var n=1;
var z = 0;

function loop (arr)
{
    for(let i of arr)
    {
        if(i.children.length)
        {
            let clas = i.className.split(" ");
            apply_style(i, clas);
            let cc = i.children;
            loop(cc);
        }
        else
        {
            let clas = i.className.split(" ")
            apply_style(i, clas)
        }
    }
}

function apply_style (el, clas)
{
// clas = array of classes
//console.log(el.tagName + " : (" + el.className+")")
if(el.className.length == 0)
	return;

let styleRule = {};
    for(let i of clas)
    {
 // i = "prop1-prop2-val";
 
    if(Object.keys(spProp).includes(i))
    {
        css(el, spProp[i])
        continue;
    }
    
        let key ="", valu = "";
        let styleName = i.split("-");
        
        if(!Object.keys(prop1).includes(styleName[0]))
        	continue;
        
        for(let j of styleName)
        {
            if(Object.keys(prop1).includes(j))
            {
                key = prop1[j]
                continue;
            }
            else
            if(Object.keys(prop2).includes(j))
            {
                key += prop2[j]
                continue;
            }
            else
            if(Object.keys(val).includes(j))
            {    
				valu = val[j]
                continue;
            }
            else
            {
                valu = parse_val(styleName, j);
            }
        }
    if(!valu)
    {
    	if(styleName[0] == "bdr")
        	valu = parse_val(styleName, "border case");
         else
    		valu = def;
    }
    
    styleRule[key] = valu;
    //populate the styleRule obj for css function...  
    }
    
    if(clas.includes("showCSS"))
    {
       console.log("showCSS : " + JSON.stringify(styleRule))
    }
    css(el, styleRule)
}

function parse_val(sn, val)//sn mean styleName var in Loop apply_CSS function
{
	let parsed_val = null;
	let v = sn[sn.length - 1]; // real value for Parsing
	let z = (v[v.length -1])
	let fc = sn[0]			// prop1
	let sc = sn[1];		//  prop2
    let tc = sn[2]		// val, for bdr prop
    if(fc === "bg")
    {
    	if(sc == "lg")
    	{
    		//console.log(`v : ${v}`);
    		parsed_val = `linear-gradient(${v})`;
    	}
    	else
 	       parsed_val = '#'+v;
    }
    else
	if(fc == "bdr")
	{
		if(sc == "C")		// for color we use C for prop2
			parsed_val = `1px solid ${v}`; // ex : bdr-C-green
		else		
		if(!Object.keys(prop2).includes(sc) || tc)
			parsed_val = `${v} solid`
		else
			parsed_val = "1px solid";
	}
    else
    if(z == "p")
    {
        parsed_val = px+"x";
    }
    else
    if(z == "%" || v.includes("vh"))
    {
        parsed_val = v
    }
    else
        parsed_val = null;
    
    console.log(`(${val}) : ${v} -> ${parsed_val}`)
    return parsed_val;
}

function cl(txt){
    console.log(txt)
}

window.onload = () =>
{
  apply_CSS();
}






