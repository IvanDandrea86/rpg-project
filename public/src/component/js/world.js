//Select Game Element Section
const gameTitle=document.getElementById("game_enter")
const selectPlayer=document.getElementById("player_select")
const main_game=document.getElementById("main_game")
const createP1 =document.getElementById("player1")
const createP2 =document.getElementById("player2")
window.addEventListener("load", () => {
    console.log("World loaded")
    //Select Game Element Section
    const gameTitle=document.getElementById("game_enter")
    const selectPlayer=document.getElementById("player_select")
    const main_game=document.getElementById("main_game")
    const createP1 =document.getElementById("player1")
    const createP2 =document.getElementById("player2")
    document.getElementById("vsP2").addEventListener("click",()=>{
        //vs P2 mode
        var hero =new Person()
        var hero2 =new Person()
        //Go on Select Hero Menu
        gameTitle.style.display="none"
        selectPlayer.removeAttribute("style")
        const itemSelect=document.getElementById("item")
        createItemList(itemSelect,url_item)
        const raceSelect=document.getElementById("races")
        createRaceList(raceSelect,url_class)
        createP1.removeAttribute("style")
        document.getElementById("add_new_player").addEventListener("click",()=>{
            //Add first player
            let hero_name =document.getElementById("name").innerHTML
            let hero_race=document.getElementById("races").value
            let hero_item=document.getElementById("item").value
            hero=addNewPlayer(hero_name,hero_race,hero_item)
            hero.showStat()
            hero.displayChar()
            document.getElementById("add_new_player").innerHTML="Add Player 2"
            document.getElementById("add_new_player").removeEventListener("click",()=>{})
            document.getElementById("add_new_player").addEventListener("click",()=>{
            //Add Second player
            let hero_name =document.getElementById("name").innerHTML
            let hero_race=document.getElementById("races").value
            let hero_item=document.getElementById("item").value
            hero2=addNewPlayer(hero_name,hero_race,hero_item)
            hero2.showStat()
            hero2.displayChar()
            document.getElementById("add_new_player").innerHTML="Add Player 1"
            document.getElementById("add_new_player").removeEventListener("click",()=>{})
            selectPlayer.style.display="none"
            main_game.removeAttribute("style")
            // Load Main Game
            setBackGroundImg("1")
            //improve function to get the right character
            animateImg("player1_img","Elf","IDLE","1")
            animateImg("player2_img","Orc","IDLE","3")
            gameStart() //Start Game Turn
        })  
        })
    })
    document.getElementById("vsCPU").addEventListener("click",()=>{
        //vs CPU mode
    })
  
})