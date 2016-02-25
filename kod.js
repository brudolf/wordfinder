var c=document.getElementById("ido");
var ctx=c.getContext("2d");
ctx.rect(0, 0, 200, 30);
ctx.fillStyle = 'white';
ctx.fill();
var talaltszo = 0;
var nov = false;
var csokk = false;

function betolt() {
	var ter = document.getElementById('ter'); 
	var kiir = document.getElementById('szo'); 
	var s = '';
	var szel_hossz = 10;
	var m;
	var szo;
	var x;
	var y;
	var f = new Array();
	var g = new Array();
	var kerszo = "";
	var down = false;
	var td = ter.getElementsByTagName('td');


	function tolt() {
		var siker;
		do {
			
			for(var i=0;i<szel_hossz;i++)
			{	
				f[i] = new Array();
				g[i] = new Array();
				for(var j=0;j<szel_hossz;j++)
				{
					f[i][j] = vel_betu().toUpperCase();
					g[i][j] = 0;
				};
			};
			m = Math.floor(Math.random() * szavak.length);
			szo = szavak[m].toUpperCase().split('');
			kiir.innerHTML = szavak[m].toUpperCase();
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * 10);
			siker = beszur(szo,0,x,y);
		} while (siker == 2);
	}

	function vel(x,y) {
		return Math.floor(Math.random() * 4); 
	}

	function vel_betu() {
	 	var list = 'aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz';
	 	var charlist = list.split('');
	 	var szam = Math.floor(Math.random() * list.length);
	 	return charlist[szam];
	}

	function rosszTabla(x, y) {
	  if (x < 9 && g[x+1][y] == 0) return false;
	  if (x > 0 && g[x-1][y] == 0) return false;
	  if (y > 0 && g[x][y-1] == 0) return false;
	  if (y < 9 && g[x][y+1] == 0) return false;
	  return true;
	}

	// 0 = ok
	// 1 = nem ok
	// 2 = rossz tabla
	function beszur(szo,index,x,y) {
		if (index == szo.length) {
			return 0;
		}

		if (x < 0 || x > 9 || y < 0 || y > 9 || g[x][y] != 0) {
			return 1;
		}

		if (rosszTabla(x,y)) {
			return 2;
		}

		f[x][y] = szo[index];
		g[x][y] = szo[index];

		var siker;
		do {
			siker = false;
			switch(vel(x,y))
			{
				case 0: 
					siker = beszur(szo,index+1,x,y+1);
					break;
				case 1:
					siker = beszur(szo,index+1,x+1,y);
					break;
				case 2:
					siker = beszur(szo,index+1,x,y-1);
					break;
				case 3:
					siker = beszur(szo,index+1,x-1,y);
					break;
			}
		} while (siker == 1);

		return siker;
	}

	function rajzol() {
		ter.innerHTML = "";
		for(var i=0;i<szel_hossz;i++)
		{
			s += '<tr>';
			for(var j=0;j<szel_hossz;j++)
			{	
				s+= '<td>'+ f[i][j] +'</td>';
			};
			s += '</tr>';
		};
		ter.innerHTML = s;
	}

	ter.onmousedown = function(e) {
		e.target.setAttribute("class", "se");
		kerszo += e.target.innerHTML;
		down = true;
	}
	ter.onmouseup = function () {
		down = false;
		if(szavak[m].toUpperCase() === kerszo)
		{
			talaltszo ++;
			nov = true;
			betolt();
		}
		else
		{
		csokk = true;
			for(var i=0;i<td.length;i++)
			{
				td[i].className = "";
			}
			kerszo = "";
		}
	}
	ter.onmouseover = function(e) {
			if (down)
			{
				if (e.target.className == "" || !e.target.className)
				{
					e.target.setAttribute("class", "se");
					kerszo += e.target.innerHTML;
				}
				else
				{
					e.fromElement.setAttribute("class", "");
					kerszo = kerszo.slice(0,-1);
				}
			}
	}

	tolt();
	rajzol();
}
betolt();

function ido() {

	var s = 200;
	var time = setInterval(idocsik, 1000);
	function idocsik() {
		if(nov)
		{
			if(s <= 180)
			{
				s += 20;
			}
			nov = false;
		}
		if(csokk)
		{
			s -= 10;
			csokk = false;
		}
		if(talaltszo != 0)
		{
			ctx.beginPath();	
			c.width = c.width;
			ctx.rect(0, 0, s, 30);
			ctx.fillStyle = 'white';
			ctx.fill();
			s -= (1+ (talaltszo/3)) *2;
		}
		if(s < 0)
		{
			alert(talaltszo + " szót találtál meg!");
			talaltszo = 0;
			ctx.rect(0, 0, 200, 30);
			ctx.fillStyle = 'white';
			ctx.fill();
			ido();
			betolt();
			clearInterval(time);
		}
	}
}
ido();