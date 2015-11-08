var svgns = "http://www.w3.org/2000/svg";
var hexArray=new Array();
function hexMesh(){
	 var side=11;           
	 var drawnCentroids=[];          //array of centroids of hex which are drawn on the scree
	 var drawnAroundCentroids=[];	//array of centroid of hex which have hex drawn ALL around them 
	 var ii=0;	

	var rightEdge=screen.width;
	var leftEdge=0;
	var topEdge=0;
	var botEdge=screen.height-30;	
	var svg=document.getElementsByTagName('svg')[0];   //draw around svg
	var buttons=[{name:'Mayans',cellNum:570},{name:'Egyptians',cellNum:1426},{name:'Harappans',cellNum:1777}];
	
	
	drawWorldMap();
	drawOver();
	makeButtons();
	
	
	function drawWorldMap(){
	var worldMap=document.createElementNS(svgns,'use');
	worldMap.setAttributeNS("http://www.w3.org/1999/xlink",'href',"svg/worldMap.svg#worldMap");
	svg.appendChild(worldMap);
	}
	
	function makeButtons(){
		for(var i=0;i<buttons.length;i++){
			hexArray[buttons[i].cellNum].setBtn(svg,buttons[i].name);
			var btnElement=document.getElementById(buttons[i].cellNum);
			
			btnElement.addEventListener('mouseover', function(){shineAround(this.id,true)});   //@param1=hexid @param2=shine
			btnElement.addEventListener('mouseout', function(){shineAround(this.id,false)});
		}
	}	
	
	
	
		
	//draw hexagons over the defined edges
	function drawOver(){
		var verticalBlock=1;       			//first vertical block of hexagons
		var offSet=side*(1.73/2);  			//offset to the next block to align the hexagons
		var hexCounter=1;
		
		hexArray[0]=new Hexagon(0,0,side,hexCounter);// starting hex @param1:cx @param2:cy @param3:side @param4:id
		
		for(i=hexArray[0].cx;i<rightEdge;i=i+side*1.5){
		verticalBlock++;
			for(j=(verticalBlock%2==0)?(hexArray[0].cy):(hexArray[0].cy+offSet);j<botEdge;j=j+side*1.732){
				hexCounter++;
				hexArray[hexCounter]=new Hexagon(i,j,side,hexCounter);
				//console.log(i,j);
				hexArray[hexCounter].makeHex(svg,svgns);
			}
				
		}
	}
	
	//shine all hex around hexID
	function shineAround(hexID,shine){
		var hex=hexArray[hexID];
		console.log('shineAround',hexID,hex);
		var xRight;// y axiom from centroid of the  hexs' RIGHT of current
		var xLeft;//  y axiom from centroid of the  hexs' left of current
		var yMidTop;//  x axiom from centroid of the  hexs' sided-top of current
		var yMidBot;//  x axiom from centroid of the  hexs' sided-bottom of current
		var yTop;  // x axiom from the centroid of the top hex from current
		var yBot;  // x axiom from the centroid of the bot hex from current	
	
		xRight=hex.cx+(side+side/2);
		xLeft=hex.cx-(side+side/2);
		yMidTop=(hex.cy-(1.73/2*side));   //sqrt 3 is 1.73
		yMidBot=(hex.cy+(1.73/2*side));
		yTop=(hex.cy-(1.73*side));
		yBot=(hex.cy+(1.73*side));
			
	//top right
		var topRightHex=getHex(hexArray,xRight,yMidTop);
		
	//top left
		var topLeftHex=getHex(hexArray,xLeft,yMidTop);	
		
	//top 
		var topHex=getHex(hexArray,hex.cx,yTop);	
	
	//bot 
		var botHex=getHex(hexArray,hex.cx,yBot);	
	  
	//botRight 
		var botRightHex=getHex(hexArray,xRight,yMidBot);	
	  
	//botLeft 
		var botLeftHex=getHex(hexArray,xLeft,yMidBot);	
	   
		if(shine){                   
			topRightHex.shine();
			topLeftHex.shine();	
			topHex.shine();	
			botHex.shine();
			botRightHex.shine();
			botLeftHex.shine();	
		}
		else
		{
			console.log(hexID)
			topRightHex.removeShine();
			topLeftHex.removeShine();	
			topHex.removeShine();	
			botHex.removeShine();
			botRightHex.removeShine();
			botLeftHex.removeShine();
			
		}
	}
	
	//Unused function kept it as might be able to play around with it 
	function drawHexAround(cent){
		var rightEdgeReached=false;
		var botEdgeReached=false;
		
			//console.log(screen.width);
			rightEdge=1300;
		
			botEdge=700;
		
		
			
		if(ii<20){
		ii++;
		
			var xRight;// y axiom from centroid of the  hexs' RIGHT of current
			var xLeft;//  y axiom from centroid of the  hexs' left of current
			var yMidTop;//  x axiom from centroid of the  hexs' sided-top of current
			var yMidBot;//  x axiom from centroid of the  hexs' sided-bottom of current
			var yTop;  // x axiom from the centroid of the top hex from current
			var yBot;  // x axiom from the centroid of the bot hex from current	
			var centroidNew;
			
			xRight=cent.cx+(side+side/2);      //some math 
			xLeft=cent.cx-(side+side/2);
			yMidTop=(cent.cy-(1.73/2*side));   //sqrt 3 is ~1.73
			yMidBot=(cent.cy+(1.73/2*side));
			yTop=(cent.cy-(1.73*side));
			yBot=(cent.cy+(1.73*side));
				
			//top right
			centroidNew={
						cx:xRight,
						cy:yMidTop
					};
			
			if((!contains(drawnCentroids,centroidNew,'top right'))&&(centroidNew.cx<rightEdge&&centroidNew.cy>0)){
				makeHex(centroidNew);
				drawnCentroids.push(centroidNew);
			}	
				
			//bottom right
			centroidNew={
						cx:xRight,
						cy:yMidBot
					};
			if((!contains(drawnCentroids,centroidNew,'bottom right'))&&(centroidNew.cx<rightEdge&&centroidNew.cy<botEdge)){		
				makeHex(centroidNew);
				drawnCentroids.push(centroidNew);
			}	
			
			//bot
			centroidNew={
						cx:cent.cx,
						cy:yBot
					};  
			if((!contains(drawnCentroids,centroidNew,'bot'))&&(centroidNew.cy<botEdge)){			
				makeHex(centroidNew);
				drawnCentroids.push(centroidNew);
			}
			
		   //top 
		   centroidNew={
						cx:cent.cx,
						cy:yTop
					};
			
			if((!contains(drawnCentroids,centroidNew,'top '))&&(centroidNew.cy>0)){
				makeHex(centroidNew);
				drawnCentroids.push(centroidNew);
			}	
			
			 //top left
			 centroidNew={
						cx:xLeft,
						cy:yMidTop
					};
			if((!contains(drawnCentroids,centroidNew,'top left'))&&(centroidNew.cx>0&&centroidNew.cy>0)){			
				makeHex(centroidNew);
				drawnCentroids.push(centroidNew);
			}	
			
			//bottom left
			centroidNew={
						cx:xLeft,
						cy:yMidBot
					};
			if((!contains(drawnCentroids,centroidNew,'bot left'))&&(centroidNew.cx>0&&centroidNew.cy<botEdge)){			
				makeHex(centroidNew);
				drawnCentroids.push(centroidNew);
			}
				
			drawnAroundCentroids.push(cent); //cent has all 6 sides surrounded by hexagon
		
			var l=drawnCentroids.length;
			for(var i=0;i<l;i++){
				if(!contains(drawnAroundCentroids,drawnCentroids[i])){
					  drawHexAround(drawnCentroids[i]);
				}
			}
		}
		else{
			return false;
		}
	}
		
	function contains(a,obj ) {
		var l = a.length;
		for(var i=0;i<l;i++) {
			if ((Math.abs(parseInt(a[i].cx) - parseInt(obj.cx))<1) && (Math.abs(parseInt(a[i].cy) - parseInt(obj.cy))<1)) {  //having a tolerence of one pixel
				return true;
			}
		}
	return false;
	}
	
	function getHex(a,cx,cy){
		var l = a.length;
		
		for(var i=2;i<l;i++) {
			if ((Math.abs((a[i].cx) - (cx))<1) && (Math.abs((a[i].cy) - (cy))<1)) {  //having a tolerence of one pixel
				return a[i];
			}
		}
		return null;
	}
}		
		
		