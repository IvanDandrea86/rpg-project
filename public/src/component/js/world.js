//Select Game Element Section
var gameEnd = false
var hero = new Person()
var hero2 = new Person()

var model, model2
var p1ready = false
var p2ready = false
var attacker =new Person()
var defender =new Person()
const gameTitle = document.getElementById("game_enter")
const selectPlayer = document.getElementById("player_select")
const main_game = document.getElementById("main_game")
const addPlayer2Btn = document.getElementById("add_player1")
const addPlayerBtn = document.getElementById("add_player2")
const racesList = document.getElementById("races")
const racesLlist2 = document.getElementById("races2")
const itemlist = document.getElementById("item")
const itemlist2 = document.getElementById("item2")
const statPLayer1 = document.getElementById("stat_player1")
const statPLayer2 = document.getElementById("stat_player2")
audio = new Audio();
audio.src = "https://vgmsite.com/soundtracks/halo-infinite-set-a-fire-in-your-heart/njazlospea/01%20Set%20a%20Fire%20in%20Your%20Heart.mp3";
/**
 * Random PLayer turn select
 * @param {Person} player1 -
 * @param {Person} player2 -
 * @returns {Person}
 */
let selectFirstPlayerTurn = (player1, player2) => {
    if (Math.random() < 0.50) {

        return player1
    }
    else {

        return player2
    }
}


let takeAction = (obj, obj1) => {
        document.getElementById("attack").addEventListener("click", () => {
        changeAnimation(player1_img, obj.race, "ATTACK", model,timer1)
        changeAnimation(player2_img, obj1.race, "ATTACK", model2,timer2)
        damageCalculation(obj, obj1)
        console.log(obj.currenthealth)
        console.log(obj1.currenthealth)
        gameEnd = checkLifeline(obj, obj1)
        //switch
        let temp = obj
        obj = obj1
        obj1 = temp
        writeOnConsole(`Defender has ${obj1.currenthealth} Turn Switched is now ${obj.heroName} turn`)
        })
        document.getElementById("heal").addEventListener("click", () => {
        obj.heal()
        gameEnd = checkLifeline(obj, obj1)
        let temp = obj
        obj = obj1
        obj1 = temp
        writeOnConsole(`Turn Switched is now ${obj.heroName} turn`)
        })

}

let startBattle = (obj, obj1) => {
    let player1_img = document.getElementById("player1_img")
    let player2_img = document.getElementById("player2_img")
    console.log(hero2.currenthealth)
    console.log(hero.currenthealth)
    // hero.displayChar()
    // hero2.displayChar()
    // drawStat(statPLayer1, obj)
    // drawStat(statPLayer2, obj1)
    selectPlayer.style.display = "none"
    main_game.removeAttribute("style")
   
    writeOnConsole( `The Battle between ${hero.heroName}and ${hero2.heroName} has started`)
    setBackGroundImg("1")
    animateImg(player1_img, obj.race, "IDLE", model,timer1)
    animateImg(player2_img, obj1.race, "IDLE", model2,timer2)
    attacker = selectFirstPlayerTurn(hero, hero2)
    if (attacker == obj) {
        defender = obj1
    } else {
        defender = obj
    }
    takeAction(attacker, defender)
}

let createMenuSelect=()=>{
    audio.play()
    gameTitle.style.display = "none"
    selectPlayer.removeAttribute("style")
    createRaceList(racesList, url_class)
    createRaceList(racesLlist2, url_class)
    racesList.addEventListener("click", () => {
        clearItemSelect(itemlist)
        let selected = racesList.value
        createItemList(itemlist, url_item, selected)
    })
    racesLlist2.addEventListener("click", () => {
        clearItemSelect(itemlist2)
        let selected = racesLlist2.value
        createItemList(itemlist2, url_item, selected)
    })

}



window.addEventListener("load", () => {

    document.getElementById("vsP2").addEventListener("click", createMenuSelect)
        //vs P2 mode
        addPlayer2Btn.addEventListener("click", () => {
            let hero_name = document.getElementById("name").value
            let hero_race = document.getElementById("races").value
            let hero_item = document.getElementById("item").value
            hero.heroName=hero_name
            hero.race=hero_race
            hero.item=hero_item
            updateRace(hero, url_class)
            console.log(hero)
            // hero= updateItem(hero, url_item)
            model = selectModel(hero_race, hero_item)
            model = model.toString()
            addPlayer2Btn.disabled = true
            p1ready = true
            
            if (p1ready == true && p2ready == true) {
                audio.pause()
                startBattle(hero,hero2)
            }
        })
        addPlayerBtn.addEventListener("click", () => {
            let hero_name2 = document.getElementById("name2").value
            console.log(hero_name2)
            let hero_race2 = document.getElementById("races2").value
            let hero_item2 = document.getElementById("item2").value
            hero2.heroName=hero_name2
            hero2.race=hero_race2
            hero2.item=hero_item2
            updateRace2(hero2,url_class)
            updateItem(hero2, url_item)
            model2 = selectModel(hero_race2, hero_item2)
            model2 = model2.toString()
            addPlayerBtn.disabled = true
            p2ready = true
            
            if (p1ready == true && p2ready == true) {
                audio.pause()
                startBattle(hero, hero2)
                
                // console.log(hero2.currenthealth)
            }
        })


    })





    document.getElementById("vsCPU").addEventListener("click", () => {
        //vs CPU mode
    })



