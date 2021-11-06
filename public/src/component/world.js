window.addEventListener("load", () => {
    console.log("World loaded")
    var hero
    var hero2

    document.getElementById("new_player").addEventListener("click", () => {
        document.getElementById("action_1").style.visibility = "visible"
        document.getElementById("player1").style.visibility = "hidden"
        let player_name = document.getElementById("name").value
        let player_race = document.getElementById("classe").value
        let player_item = document.getElementById("item").value
        hero = addNewPlayer(player_name, player_race, player_item)

        document.getElementById("attack").addEventListener("click", () => {
            damageCalculation(hero, hero2)
            checkLifeline(hero, hero2)
        })
        document.getElementById("heal").addEventListener("click", () => {
            hero.heal();
        })
        document.getElementById("showStat").addEventListener("click", () => {
            hero.showStat();
        })
    })
    document.getElementById("new_player2").addEventListener("click", () => {
        document.getElementById("action_2").style.visibility = "visible"
        document.getElementById("player2").style.visibility = "hidden"
        let player_name2 = document.getElementById("name2").value
        let player_race2 = document.getElementById("classe2").value
        let player_item2 = document.getElementById("item2").value
        hero2 = addNewPlayer(player_name2, player_race2, player_item2)

        document.getElementById("attack2").addEventListener("click", () => {
            damageCalculation(hero2, hero)
            checkLifeline(hero2, hero1)
        })
        document.getElementById("heal2").addEventListener("click", () => {

            hero2.heal();
        })
        document.getElementById("showStat2").addEventListener("click", () => {
            hero2.showStat();
        })
    })
})