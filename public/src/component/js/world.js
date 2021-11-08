//Select Game Element Section
var hero=new Person()
var hero2=new Person()
var model,model2
var p1ready=false
var p2ready=false
const gameTitle=document.getElementById("game_enter")
const selectPlayer=document.getElementById("player_select")
const main_game=document.getElementById("main_game")
const addPlayer2Btn= document.getElementById("add_player1")
const addPlayerBtn= document.getElementById("add_player2")
const racesList =document.getElementById("races")
const racesLlist2 =document.getElementById("races2")
const itemlist =document.getElementById("item")
const itemlist2 =document.getElementById("item2")

/**
 * Random PLayer turn select
 * @param {Person} player1 -
 * @param {Person} player2 -
 * @returns {Person}
 */
 let selectFirstPlayerTurn=(player1,player2)=>{
    if(Math.random() < 0.50){ 
     
        return player1
     }
     else{
         
         return player2
     }
 }
 
 let startBattle=(hero,hero2)=>{
    let player1_img= document.getElementById("player1_img")
    let player2_img= document.getElementById("player2_img")
    console.log(player1_img)
    console.log(player2_img)
     selectPlayer.style.display="none"
     main_game.removeAttribute("style")
     console.log("Battle Started")
     setBackGroundImg("1")
        animateImg(player1_img,hero.race,"IDLE",model)
        animateImg(player2_img,hero2.race,"IDLE",model2)
  
    
}





window.addEventListener("load", () => {
    audio = new Audio();
    audio.src = "https://vgmsite.com/soundtracks/halo-infinite-set-a-fire-in-your-heart/njazlospea/01%20Set%20a%20Fire%20in%20Your%20Heart.mp3";
    document.getElementById("vsP2").addEventListener("click",()=>{
        audio.play()
        gameTitle.style.display="none"
        selectPlayer.removeAttribute("style")
        createRaceList(racesList,url_class)
        createRaceList(racesLlist2,url_class)
        racesList.addEventListener("click",()=>{
            clearItemSelect(itemlist)
            let selected= racesList.value 
            createItemList(itemlist,url_item,selected)
        })
        racesLlist2.addEventListener("click",()=>{
            clearItemSelect(itemlist2)
            let selected= racesLlist2.value 
            createItemList(itemlist2,url_item,selected)
        })
        //vs P2 mode
        addPlayer2Btn.addEventListener("click",()=>{
            let hero_name =document.getElementById("name").value
            let hero_race=document.getElementById("races").value
            let hero_item=document.getElementById("item").value
            hero=addNewPlayer(hero_name,hero_race,hero_item)
            console.log (hero)
            
            model=selectModel(hero_race,hero_item)
            model=model.toString()
            addPlayer2Btn.disabled =true 
            p1ready=true
             if (p1ready==true && p2ready==true){
                 play.pause()
                 startBattle()
             }
        })
        addPlayerBtn.addEventListener("click",()=>{
            let hero_name2 =document.getElementById("name2").value
            let hero_race2=document.getElementById("races2").value
            let hero_item2=document.getElementById("item2").value
            hero2=addNewPlayer(hero_name2,hero_race2,hero_item2)
            console.log (hero2) 
            model2=selectModel(hero_race2,hero_item2)
            model2=model2.toString()
            addPlayerBtn.disabled =true
            p2ready=true
             if (p1ready==true && p2ready==true){
                play.pause()
                 startBattle(hero,hero2)
             }
        })
        
     
    })
        
         
         
     
    
    document.getElementById("vsCPU").addEventListener("click",()=>{
        //vs CPU mode
    })
})

