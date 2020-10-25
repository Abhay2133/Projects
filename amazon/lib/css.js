var ict = 0

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
    zi : 'zIndex'
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
    i : "inherit",
    fs : "flex-start",
    fe : 'flex-end',
    spb : 'space-between',
    rel : 'relative',
    fxd : 'fixed',
    opac : 'rgba(0,0,0,0.5)'
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
}
}

function apply_CSS (cb)
{
	
    let body = document.body;
    let bc = body.children

    //apply_style(body, body.className.split(" "))
    loop(body, apply_style)
    
    if(cb)
        cb();
  
}

function loop (el, cb)
{
	let arr = el.children;
	cb(el, el.className.split(" "))
	if(arr.length)
	{
    for(let i of arr)
    {
       let clas = i.className.split(" ");
       cb(i, clas);
            
    	loop(i, apply_style);
    }
	}
}

function apply_style (el, clas)
{

let styleRule = {};
    for(let i of clas)
    {
/*
    if(i == "MQ")
    {
        apply_MQ()
        continue;
    }
    */
    
    if(Object.keys(spProp).includes(i))
    {
        css(el, spProp[i])
        continue;
    }
    
        let key ="", valu = "";
        let styleName = i.split("-");
        
         if(styleName[0] == "hbr")
		{
		if(!hbr.includes(i))
			{
			hbr.push(i)
			apply_hbr(el, i)
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

function parse_val(v, fc)//fc means first character
{
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

function apply_hbr (el, clas)
{
	setTimeout(function ()
{
	let s = clas.split("-");
	let key = prop1[s[1]];
	let valu = parse_val(s[2], s[1]);
	let stylStr = `<style>
.${clas}:hover
{
	${key} : ${valu};
}
</style>`;

document.body.innerHTML += stylStr
}, 500);

}

function apply_MQ()
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
    
    console.log('iteration count : %i', ict)

}








