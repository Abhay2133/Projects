var ii = 0

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
    bg : "background",
    idt : "textIndent",
    of : "overflow",
    oln : "outline",
    clr :"color",
    cur : "cursor",
    trans : "transition",
    jc : "justifyContent",
    tp : 'top',
    lf : 'left',
    pos : 'position',
    zi : 'zIndex',
    fdir : "flexDirection",
    fw : "fontWeight",
    ws : "whiteSpace"
}

var hbr = [];

const prop2 = {
    T : "Top",
    B : "Bottom",
    L : "Left",
    R : "Right",
    C : "Color"
}

const val = {
	flag : "linear-gradient(90deg, #FF8100, White, white, #05C700)",
    xxs : "1px",
    xs : "3px",
    s : "5px",
    l : "15px",
    xl : "20px",
    xxl : "25px",
    xxxl : "30px",
    Xl : "40px",
    XXl : "50px",
    no : "none",
    b : "block",
    ib : "inline-block",
    c : "center",
    lft : "left",
    r : "right",
    "100" : "100%",
    "30": "30px",
    drk : "#333",
    n : "0px",
    W : "white",
    m : "10px",
    a : "auto",
    flx : "flex",
    "50" : "50%",
    hdn : "hidden",
    scrl : "scroll",
    i : "inherit",
    fs : "flex-start",
    fe : 'flex-end',
    spb : 'space-between',
    spe : 'space-evenly',
    rel : 'relative',
    fxd : 'fixed',
    opac : 'rgba(0,0,0,0.5)',
    col : "column",
    nwrp : "nowrap",
    trnsprnt : "rgba(0,0,0,0)"
}

const bdrVal = {
	def : "1px solid",
	xs : "2px solid",
	s : "3px solid",
	l : "4px solid",
	xl : "5px solid"
}


var def = "10px";

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
    wnb : 
	{
		background : "white",
		color: "black"
	},
    bold : {
        fontWeight : "500"
    },
    thin : {
        fontWeight : "300"
    },
    bolder : {
        fontWeight : "900"
    },
    "bold-n" : {
        fontWeight : "100"
    },
    none : {
    	display : "none"
   },
   "lit-bdr" : {
	border : "1px solid white"
},
"hw-40p" : {
	height: "40px",
	width : "40px"
},
"trns-s" : {
	transition : "0.2s"
},
slider : {
	display: "flex",
    overflowX: "scroll" ,
    scrollSnapType: "x mandatory",
    scrollBehavior : "smooth"
},
slides : {
	scrollSnapAlign: "start",
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center" ,
    alignItems: "center" ,
    width: "100%",
    marginRight: "10px",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "repeat"
},
img : {
	backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "repeat",
    fontSize : "0px"
}
}

async function apply_CSS (cb = apply_MQ)
{
    let lup = await loop(document.body, apply_style)
    let MQ = await cb()
    
    await hbr_init(fadeOut)
	//fadeout(ses("#spinner"))
}

async function loop (el, cb, flag = true)
{
	let arr = el.children;
	if(flag)
	{
		let elClas =  el.className.split(" ")
		let bbw = await cb(el, elClas,"("+ elClas[elClas.length -1]+") outer")
	}
	
	if(arr.length)
	{
   	 for(let i of arr)
 	   {
  	     let clas = i.className.split(" ");
  	     let bb = await cb(i, clas, "("+clas[clas.length - 1]+")inner");
            
  	  	let cc = await loop(i, apply_style, false);
  	  }
	}
}

async function apply_style (el, clas, logMess = "")
{

//console.log("%i : %s %s", ii++, clas.join(), logMess);

let styleRule = {};
    for(let i of clas)
    {
    
    if(Object.keys(spProp).includes(i))
    {
      await  css(el, spProp[i])
      if(i == "img")
      {
      	cl(el.innerHTML)
      
      	el.style.backgroundImage = `url("${el.innerHTML}")`;
      }
        continue;
    }
    
        let key ="", valu = "";
        let styleName = i.split("-");
        
        if(styleName[0] == "chd")
        {
        	let forAwait = await apply_css_to_children(el, i);
        	continue;
       }
        if(styleName[0] == "hbr")	//	HBR
		{
		if(!hbr.includes(i))
		{
			hbr.push(i)
			stylStr += `.${i}:hover
{`
			i = i.replace("hbr-", "")
			let hbr_clases = i.split("_");
			
			for(cls of hbr_clases)
			{
				await add_hbr(cls)
			}
			stylStr += "\n}\n";
		}
			continue;
		}
		else
        if(!Object.keys(prop1).includes(styleName[0]))
        {
			//cl(true + " : "+ styleName[0]);
			continue;
		}
		 
        
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
            if(Object.keys(val).includes(j) && styleName[0] != "bdr")
            {
                valu = val[j]
                continue;
            }
             if(Object.keys(bdrVal).includes(j) && styleName[0] == "bdr")
            {
                valu = bdrVal[j]
                continue;
            }
            else
            {
                valu = parse_val(j, styleName[0]);
            }
            
        }
       if(!valu)
       {
       if(styleName[0] == "bdr")
       	valu = bdrVal.def;
       else
          valu = def
         }
    
    styleRule[key] = valu;
    }
      if(clas.includes("showCSS"))
		 cl(clas[clas.length - 1]+" :- "+JSON.stringify(styleRule))
    
     css(el, styleRule)
}

function parse_val(v, fc, mess)//fc means first character
{
	if(!v) console.log("value parser bug : "+mess)
    let z = (v[v.length -1])
    let a = v[0];
    if(a ==="c")
    {
    	let clr = [...v]
    	clr.shift();
        return clr.join("");
    }
    else
    if(fc === "bg")
    {
        return '#'+v;
    }
    else
    if(z == "p")
    {
        let px = [...v]
        px.pop()
        px = px.join("");
    	
    if(fc == "bdr")
    	return px + "px solid"
    else
        return px+"px";
    }
    else
    if(z == "%")
    {
        let pcntg = [...v]
        pcntg.pop()
        pcntg = pcntg.join("");
    
        return pcntg+"%";
    }
    
}

function cl(txt){
    console.log(txt)
}

var stylStr = '<style>\n';

async function add_hbr (clas, flag)
{
	
	let s = clas.split("-");
	let str = s.join("")
	if(Object.keys(spProp).includes(str))
	{
		console.log(true)
		for(let key in spProp[str])
		{
			let valu = spProp[str][key];
			stylStr += `${key} : ${valu};`
		}
	}
	else
	{
		console.log(s)
	let key = prop1[s[0]];
	let valu = await parse_val(s[1], s[0], clas);
	stylStr += `
	${key} : ${valu};`

	}
}

async function hbr_init(cb)
{
	stylStr += "</style>";
	document.body.innerHTML += stylStr;
	console.log(stylStr)
	if(cb) 
		cb("spinner", 1)
}

async function apply_MQ()
{
    if(screen.width < 768)
        return;
    ses("#hamburger").style.display = "none";
    let menuList = ses("#menu-list");
    css(menuList, {
        display : "flex",
        flexDirection : "row",
        justifyContent : "center"
    });

   for(let i of menuList.children)
   {
       i.style.padding = "10px 40px";
    }
}

async function apply_css_to_children(el, clas)
{
	clas = clas.replace("chd-", "")
	////console.log("clas : %s", clas)
	let chdrn = el.children
	if(chdrn.length)
	{
		for(let i of chdrn)
		{
			let bb = await apply_style(i, [clas], "(inside CHD styler)");
		}
	}
	else
		return;
}






