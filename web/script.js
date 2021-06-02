let colors=["green","red","blue","orange","yellow","brown"]

let boxColors = colors.concat(colors)
boxColors = boxColors.concat(boxColors);
boxColors.sort(() => Math.random() - 0.5);

let upboxes = document.getElementById("up3x3").querySelectorAll('.upbox');

let upColors=boxColors.slice(9);
for (let i = 0; i < 9; i++) 
{
    upboxes[i].style.backgroundColor = upColors[i];
}
boxColors.sort(() => Math.random() - 0.5);

let downboxes = document.getElementById("down5x5").querySelectorAll('.downbox');

for (let i = 0; i < 25; i++) 
{
    downboxes[i].style.backgroundColor = boxColors[i];
    downboxes[i].onclick=function(){
        boxClicked(i);
    };
}
downboxes[24].onclick=function(){
    boxClicked(24);
};
let animateId=null,pos=0,elem=null,boxNum=null,topVal=0,leftVal=0,eBox=downboxes[24],eNum=24,mover=null;
function moveLeft()
{
    leftVal+=10;
    elem.style.left=leftVal+"px";
}
function moveRight()
{
    leftVal-=10;
    elem.style.left=leftVal+"px";    
}
function moveTop()
{
    topVal+=10;
    elem.style.top=topVal+"px";
}
function moveBottom()
{
    topVal-=10;
    elem.style.top=topVal+"px";    
}
function frame() {
    if (pos == 120) {
        clearInterval(animateId);
        eBox.style.backgroundColor=elem.style.backgroundColor;
        elem.style.backgroundColor="transparent";        
        elem.style.top="0px";
        elem.style.left="0px";
        eNum=boxNum;
        eBox=downboxes[eNum];
        pos=0;
        topVal=0;
        leftVal=0;
        if(isGameWon())
        {
            //GAME WIN LOGIC here
            alert("YOU WON");
        }
    } 
    else
    {
        pos+=10; 
        mover();
    }
  }
function setMover(x1,y1,x2,y2)
{
    if(x1==x2)
    {
        if(y1+1==y2)
        {
            mover=moveLeft;
        }
        else if(y1-1==y2)
        {
            mover=moveRight;
        }
        else
        {
            return false;
        }
    }
    else if(y1==y2)
    {
        if(x1+1==x2)
        {
            mover=moveTop;
        }
        else if(x1-1==x2)
        {
            mover=moveBottom;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
    return true;
}
let centre3x3=[6,7,8,11,12,13,16,17,18];
function isGameWon()
{
    for (let i = 0; i < 9; i++) {
        let rhs=downboxes[centre3x3[i]].style.backgroundColor, lhs=upColors[i];
        console.log(rhs,lhs);
        if(rhs!=lhs)
            return false;    
    }
    return true; 
}
function boxClicked(i)
 {  
    let x1=Math.floor(i/5),y1=i%5,x2=Math.floor(eNum/5),y2=eNum%5;
    if(setMover(x1,y1,x2,y2))
    {
        boxNum=i;
        elem=downboxes[boxNum];
        clearInterval(animateId);
        animateId = setInterval(frame, 5);
    }
    else
    {
        //wrong move logic here
    }
 }
 //ADD SOUNDS & effects