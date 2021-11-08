var frame_counter=0
var timer1
var timer2
/**
 * Slect Fighting Background 
 * @param {String} set 
 */
let setBackGroundImg=(set)=>{
    let backGroundContainer =document.getElementById("backGroundContainer")
    backGroundContainer.style.backgroundImage= "url('./src/image/background/PNG/game_background_"+set+"/game_background_"+set+".png')"
}
/**
 * Animate the image
 * @param {HTMLElement} elem 
 * @param {String} race 
 * @param {String} mode 
 * @param {String} color 
 */
let animateImg=(elem,race,mode,color,timer_animation)=>{
    timer_animation=setInterval(() => {
    const maxFrame=10  
    elem.src="./src/image/"+race+"/_PNG/"+color+"/"+race+"_0"+color+"__"+mode+"_00"+frame_counter+".png"
    frame_counter++
    if (frame_counter >= maxFrame){ 
        frame_counter=0   
    }
}, 150);
}
let changeAnimation=(elem,race,mode,color,timer_animation)=>{
    clearInterval(timer_animation)
    timer_animation=setInterval(() => {
        const maxFrame=10  
        elem.src="./src/image/"+race+"/_PNG/"+color+"/"+race+"_0"+color+"__"+mode+"_00"+frame_counter+".png"
        frame_counter++
        if (frame_counter >= maxFrame){ 
            frame_counter=0  
            clearInterval(timer_animation) 
        }
    }, 15);

}
