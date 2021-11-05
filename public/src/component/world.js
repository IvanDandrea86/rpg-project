
window.addEventListener("load", () => {
    console.log("World loaded")
})
    
    document.getElementById("new_player").addEventListener("click",()=>{
        document.getElementById("action_1").style.visibility="visible"
        document.getElementById("player1").style.visibility="hidden"
        let player_name=document.getElementById("name").value
        let player_race=document.getElementById("classe").value 
        let player_item =document.getElementById("item").value
        var hero = addNewPlayer(player_name,player_race,player_item)
        hero= updateItem(hero,url_item) //Update stats based on race  and item
        
        hero.showStat()
        document.getElementById("attack").addEventListener("click",()=>{
            hero.damage();
        })
        document.getElementById("heal").addEventListener("click",()=>{
            hero.heal();
        })
        document.getElementById("showStat").addEventListener("click",()=>{
            hero.showStat(hero);
        })
    })
    document.getElementById("new_player2").addEventListener("click",()=>{
        document.getElementById("action_2").style.visibility="visible"
        document.getElementById("player2").style.visibility="hidden"
        document.getElementById("attack2").addEventListener("click",()=>{
            hero2.damage();
        })
        document.getElementById("heal2").addEventListener("click",()=>{
           
            hero2.heal();
        })
        document.getElementById("showStat2").addEventListener("click",()=>{
            hero2.showStat();
        })
    })
   
   