function Hexagon(cx,cy,side,id){
	
	this.cx=cx;
	this.cy=cy;
	this.side=side;
	this.id=id;
	this.amount=1;
	this.zoomHeight=1;
	
	this.isBtn=false;
	this.name='';
	
};



Hexagon.prototype.clearZoomed=function clearZoomed(ele){
	ele.style.transform = 'scale(1)';

	 var zoomedHex=document.getElementById('clicked');
	 var zoomedText=document.getElementById('btnText')
	 if(zoomedHex){
		ele.removeChild(zoomedHex);
	}
	 else{
		zoom=1;
	 }
	 if(zoomedText){
		ele.removeChild(zoomedText);
	}
}

//Javascript animation
Hexagon.prototype.zoomHex=function zoomHex(hex){
	if(this.isBtn){							
		var repeater;
		var hexObj=this;
		var newHexSide=200;
		var headText='Mayans';
		var desc='The mayans civilzation lasted for 1000 year until they mysterirously receded and finally wiped out by the spaniards';
		hex.style.transformOrigin=this.cx,this.cy;
		hex.style.transform = 'scale('+zoom+')';
		zoom=zoom+.005;
		
		if(zoom>1.2){
			console.log('cleared');
			clearTimeout(repeater);
			var clickedHex=new Hexagon(hexObj.cx+(hexObj.side+newHexSide)/2,hexObj.cy-(hexObj.side+newHexSide)*(1.73/2),newHexSide,'clicked'); //30 -60 90 therem some math 
			clickedHex.makeHex(hex);
			
			var clickedEle=document.getElementById('clicked');
			clickedEle.style.fill='orange';
			clickedEle.style.backgroundImage = "url('images/mayans.jpg')";
			
			var btnText=document.createElementNS(svgns,'text');
			btnText.setAttribute('x',clickedHex.cx-clickedHex.side+15);
			btnText.setAttribute('y',clickedHex.cy);
			btnText.setAttribute('id','btnText');
			btnText.setAttribute('fill','white');
			btnText.setAttribute('style','font-family:lato');
			
			
			if(hexObj.name==="Mayans"){
				btnText.textContent ="MAYANS ,Notable city:Tikal;Script:Deciphered";
			}
			if(hexObj.name==="Egyptians"){
				btnText.textContent ="EGYPTIANS,Notable city:Memphis;Script:Deciphered";
			}	
				
			if(hexObj.name==="Harappans"){
				btnText.textContent ="HARAPPANS,city:Mohen-dajaro;Script:Unreadable";
			}			
			
			hex.appendChild(btnText);
			
			
			//tried appending svg didn't work either
			//kept the code to revisit 
			/*
			var clickedEle=document.getElementById('clicked');
			//append image
			var worldMap=document.createElementNS(svgns,'use');
		worldMap.setAttributeNS("http://www.w3.org/1999/xlink",'href',"svg/worldMap.svg#worldMap");
			clickedHex.appendChild(worldMap);
			*/
			
			
			/////I tried with foreing object wasn't successfull
			/*
			var clickedEle=document.getElementById('clicked');
			
			var switchEle=document.createElementNS(svgns,'switch');
			var forenObj=document.createElementNS(svgns,'foreignObject');
			 
			
			forenObj.setAttribute('width','400px');
			forenObj.setAttribute('height','400px');
			
			var heading=document.createElementNS(xmlns,'h2');
			var headingText=document.createTextNode(headText);
			heading.appendChild(headingText);
			
			var image=document.createElementNS(xmlns,'img');
			image.setAttribute('xmlns',"http://www.w3.org/1999/xhtml");
			image.setAttribute('src','');
			image.setAttribute('alt','Ancient Civilationzon');
			image.setAttribute('width','250px');
			image.setAttribute('height','250px');
			
			var para=document.createElementNS(xmlns,'p');
			para.setAttribute('xmlns',"http://www.w3.org/1999/xhtml");
			var paraText=document.createTextNode(desc);
			para.appendChild(paraText);
			
			switchEle.appendChild(forenObj);
			forenObj.appendChild(heading);
			forenObj.appendChild(image);
			forenObj.appendChild(para);
			clickedEle.appendChild(forenObj);
		   */
			
		}
		else{
		var repeater=setTimeout(function(){hexObj.zoomHex(hex)},5);   
		}
	}
}

Hexagon.prototype.setBtn=function setBtn(ele,name){
	this.isBtn=true;
	this.name=name;
	var btnHex=document.getElementById(this.id);
	btnHex.style.fill='orange';
	var btnText=document.createElementNS(svgns,'text');
	var btnLine= document.createElementNS(svgns,'line');
	
	btnText.setAttribute('x',this.cx+this.side/1.2);
	btnText.setAttribute('y',this.cy-this.side*1.6);
	btnText.setAttribute('fill','Black');
	btnText.setAttribute('style','font-family:lato');
	btnText.textContent =name;
	
	btnLine.setAttribute('x1',this.cx+this.side/1.2);
	btnLine.setAttribute('y1',this.cy-this.side*1.6);
	btnLine.setAttribute('x2',this.cx);
	btnLine.setAttribute('y2',this.cy);
	btnLine.setAttribute('style','stroke:orange;stroke-width:2');
	
	ele.appendChild(btnLine);
	ele.appendChild(btnText);
}

Hexagon.prototype.makeHex =function makeHex(ele){
	var hexObj=this;
	var x1,x2,x3,x4,x5,x6;
	var y1,y2,y3,y4,y5,y6;
	
	x1=this.cx-this.side;
	y1=this.cy;
	
	x2=this.cx-this.side/2;
	y2=this.cy+parseInt(Math.sqrt(3)*this.side/2);
	
	x3=this.cx+this.side/2;
	y3=this.cy+parseInt(Math.sqrt(3)*this.side/2);
	
	x4=this.cx+this.side;
	y4=this.cy;
	
	x5=this.cx+this.side/2;
	y5=this.cy-parseInt(Math.sqrt(3)*this.side/2);
	
	x6=this.cx-this.side/2;
	y6=this.cy-parseInt(Math.sqrt(3)*this.side/2);
	
	var hex=document.createElementNS(svgns,'polygon');
	hex.setAttributeNS(null,'points',x1+','+y1+' '+x2+','+y2+' '+x3+','+y3+' '+x4+','+y4+' '+x5+','+y5+' '+x6+','+y6);
	hex.setAttributeNS(null,'class','hex');
	hex.setAttributeNS(null,'id',this.id);
	hex.onclick=function(){hexObj.clearZoomed(ele);hexObj.zoomHex(ele);console.log(this.id);};
	
	
	ele.appendChild(hex);
	
	}
	//Smil animation
Hexagon.prototype.shine=function shine(){
	var hex=document.getElementById(this.id);
	
	var smil=document.createElementNS('http://www.w3.org/2000/svg', 'animate');
	
	smil.setAttribute('attributeName','fill');
	
	smil.setAttribute('values','#00003B; #00003B;#F2F2F2;#F2F2F2 ')
	smil.setAttribute('dur','2s');
	
	smil.setAttribute('begin','0')
	smil.setAttribute('repeatCount','indefinite');
	
	hex.appendChild(smil);
	
}	

Hexagon.prototype.removeShine=function removeShine(){
	var hex=document.getElementById(this.id);
	
	while(hex.firstChild){
		hex.removeChild(hex.firstChild);
	}
 
}