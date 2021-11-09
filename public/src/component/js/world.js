//Select Game Element Section
var gameEnd = false
var hero = new Person()
var hero2 = new Person()

var model, model2
var p1ready = false
var p2ready = false
var attacker = new Person()
var defender = new Person()
var backGround

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
const backgroundPreview = document.getElementById("background")
const backgroundPreviewImg = document.getElementById("preview")
const popUpEnd = document.getElementById("popUpEnd")
const btnMenu = document.getElementById("settings")
const console_status = document.getElementById("console_action")
const console_action = document.getElementById("console")
var valueBackground = "1"
    // audio = new Audio();
    // audio.src = "https://vgmsite.com/soundtracks/halo-infinite-set-a-fire-in-your-heart/njazlospea/01%20Set%20a%20Fire%20in%20Your%20Heart.mp3";
    /**
     * Random PLayer turn select
     * @param {Person} player1 -
     * @param {Person} player2 -
     * @returns {Person}
     */
let selectFirstPlayerTurn = (player1, player2) => {
    if (Math.random() < 0.50) {

        return player1
    } else {

        return player2
    }
}
let endGame = () => {
    document.querySelectorAll(".action button").forEach(elem => {
        elem.disabled = "true"
    })
    popUpEnd.removeAttribute("style")
}
let takeAction = (obj, obj1) => {
    document.getElementById("attack").addEventListener("click", () => {
        damageCalculation(obj, obj1)
        gameEnd = checkLifeline(obj, obj1)
        if (gameEnd) {
            endGame()
            return
        }
        //switch
        let temp = obj
        obj = obj1
        obj1 = temp
        writeOnConsole(`${obj.heroName} turn`, console_status)
    })
    document.getElementById("heal").addEventListener("click", () => {
        let y = obj.heal()
        console.log(y)
        gameEnd = checkLifeline(obj, obj1)
        let temp = obj
        obj = obj1
        obj1 = temp
        writeOnConsole(` ${obj.heroName} turn`, console_status)
    })
}
let startBattle = (obj, obj1) => {
    let player1_img = document.getElementById("player1_img")
    let player2_img = document.getElementById("player2_img")
    selectPlayer.style.display = "none"
    main_game.removeAttribute("style")

    writeOnConsole(`The Battle between ${hero.heroName}and ${hero2.heroName} has started`, console_status)
    setBackGroundImg(backGround)
    animateImg(player1_img, obj.race, "IDLE", model, timer1)
    animateImg(player2_img, obj1.race, "IDLE", model2, timer2)
    attacker = selectFirstPlayerTurn(hero, hero2)
    writeOnConsole(`${attacker.heroName} start first`, console_status)
    if (attacker == obj) {
        defender = obj1
    } else {
        defender = obj
    }
    takeAction(attacker, defender)
}
let createMenuSelect = () => {
    // audio.play()
    gameTitle.style.display = "none"
    selectPlayer.removeAttribute("style")
    createRaceList(racesList, url_class)
    createRaceList(racesLlist2, url_class)
    racesList.addEventListener("change", () => {
        clearItemSelect(itemlist)
        let selected = racesList.value
        createItemList(itemlist, url_item, selected)
        document.getElementById("class_container").style.display = "none"
        document.getElementById("item_container").removeAttribute("style")
    })
    racesLlist2.addEventListener("change", () => {
        clearItemSelect(itemlist2)
        let selected = racesLlist2.value
        createItemList(itemlist2, url_item, selected)
        document.getElementById("class_container2").style.display = "none"
        document.getElementById("item_container2").removeAttribute("style")
    })
}
let changeBackgroundPreview = (element, bgname) => {
        element.style.backgroundImage = `url('./src/image/background/PNG/game_background_${bgname}/game_background_${bgname}.png')`
        backGround = bgname
    }
    /*
      hide functioon
     */
let hide = () => {

        let menu = document.getElementById("menu_settings")
        menu.style.display = "none"
    }
    /**
         Is OPEN functioon
        @returns {boolean} 
        */
let isopen = () => {
    let menu = document.getElementById("menu_settings")
    if (menu.style.display == "none") return false
    else return true
}




window.addEventListener("load", () => {
    changeBackgroundPreview(backgroundPreviewImg, valueBackground)
        /*
    Open And Close settings pop up menu
    */
    btnMenu.addEventListener("click", () => {
        if (!isopen()) {
            let menu = document.getElementById("menu_settings")
            menu.removeAttribute("style")
        } else { hide() }
    })
    document.getElementById("vsP2").addEventListener("click", createMenuSelect)
        //vs P2 mode
    addPlayer2Btn.addEventListener("click", () => {

        let hero_name = document.getElementById("name").value
        let hero_race = document.getElementById("races").value
        let hero_item = document.getElementById("item").value
        hero.heroName = hero_name
        hero.race = hero_race
        hero.item = hero_item
        updateRace(hero, url_class)
            // hero= updateItem(hero, url_item)
        model = selectModel(hero_race, hero_item)
        model = model.toString()
        addPlayer2Btn.disabled = true
        p1ready = true

        if (p1ready == true && p2ready == true) {
            // audio.pause()
            startBattle(hero, hero2)
        }
    })

    backgroundPreview.addEventListener("click", () => {
        valueBackground = backgroundPreview.value
        changeBackgroundPreview(backgroundPreviewImg, valueBackground)
    })
    addPlayerBtn.addEventListener("click", () => {
        let hero_name2 = document.getElementById("name2").value

        let hero_race2 = document.getElementById("races2").value
        let hero_item2 = document.getElementById("item2").value
        hero2.heroName = hero_name2
        hero2.race = hero_race2
        hero2.item = hero_item2
        updateRace(hero2, url_class)
        updateItem(hero2, url_item)
        model2 = selectModel(hero_race2, hero_item2)
        model2 = model2.toString()
        addPlayerBtn.disabled = true
        p2ready = true
        if (p1ready == true && p2ready == true) {
            // audio.pause()
            startBattle(hero, hero2)
        }
    })


})





document.getElementById("vsCPU").addEventListener("click", () => {
    //vs CPU mode
})