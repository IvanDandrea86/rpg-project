var i=0
let setPlayerImg=(race,mode,color)=>{
    let img = document.getElementById("player_img")

img.src="./src/image/"+race+"/_PNG/"+color+"/"+race+"_01__"+mode+"_000.png"
}
let setBackGroundImg=(set)=>{
    let backGroundContainer =document.getElementById("backGroundContainer")
    backGroundContainer.style.backgroundImage= "url('./src/image/background/PNG/game_background_"+set+"/game_background_"+set+".png')"
}
let animateImg=(elem,race,mode,color)=>{
    let timer=setInterval(() => {
    const frame=10  
    let img = document.getElementById(elem)
    img.src="./src/image/"+race+"/_PNG/"+color+"/"+race+"_0"+color+"__"+mode+"_00"+i+".png"
    i++
    if (i >= frame){ 
        i=0
        // clearInterval(timer)
    }
}, 115);
}
setBackGroundImg("3")
animateImg("player_img","Orc","IDLE","2")
animateImg("player2_img","Elf","IDLE","2")


