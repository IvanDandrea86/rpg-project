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
var Interval1
var Interval2
//Audio

const audioIntro = new Audio();
 audioIntro.src = "https://vgmsite.com/soundtracks/halo-infinite-set-a-fire-in-your-heart/njazlospea/01%20Set%20a%20Fire%20in%20Your%20Heart.mp3";
 const click= new Audio();
 click.src="./src/audio/mouse-click-clicking-single-click-3-www.FesliyanStudios.com.mp3"    
 const hit= new Audio();
 hit.src="./src/audio/mixkit-martial-arts-fast-punch-2047.wav"  
const hurt= new Audio();
 hurt.src="./src/audio/mixkit-boxer-getting-hit-2055.wav"  
 window.addEventListener("click",()=>{click.play()})

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
const stat = document.getElementById("player1_stats")
const stat_1 = document.getElementById("player2_stats")
const startBtn = document.getElementById("start_button")
const attBtn= document.getElementById("attack")
const healBtn= document.getElementById("heal")
const btnReset =document.getElementById("reset")
const sfxBtn =document.getElementById  ("sfx")
const musicBtn=document.getElementById("music")
var player1_img = document.getElementById("player1_img")
var player2_img = document.getElementById("player2_img")
let control = () => {

    if (p1ready == true && p2ready == true) {
        audioIntro.pause()
        startBtn.removeAttribute("style")
    }
}
var valueBackground = "1"
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
/**
 * End Game PopUp Activate                                  
 */
let endGame = () => {
    document.querySelectorAll(".action button").forEach(elem => {
        elem.disabled = "true"
    })
    popUpEnd.removeAttribute("style")
}
/**
 * Listener for action 
 * @param {Person} obj -attacker 
* @param {Person} obj1 -defender
 */
let takeAction = (obj, obj1) => {
        Interval1=setInterval(() => {
        SetAnimationImg(player1_img, obj.race, "IDLE", model)
        }, 100);    
        Interval2 =setInterval(()=>{ 
        SetAnimationImg(player2_img, obj1.race, "IDLE", model2)
        },100)
    attBtn.addEventListener("click", () => {
        hit.play()
        clearInterval(Interval1)
        ChangeAnimationImg(player1_img, obj.race, "ATTACK", model)  
        setTimeout(()=>{
            clearInterval(Interval2)
            ChangeAnimationImg(player2_img, obj1.race, "HURT", model2)  
            hurt.play()
            let temp = obj
            obj = obj1
            obj1 = temp
            let temp1 = player1_img
            player1_img= player2_img
            player2_img = temp1
            let temp3 = model
            model= model2
            model2 = temp3
            writeOnConsole(`${obj.heroName} turn`, console_status)   
        },500)
        damageCalculation(obj, obj1)
        updateHealthBar(obj)
        updateHealthBar(obj1)
        gameEnd = checkLifeline(obj, obj1)
        if (gameEnd) {
            endGame()
            return
        }
        //switch      
    })
   healBtn.addEventListener("click", () => {
       obj.heal()
        updateHealthBar(obj)
        updateHealthBar(obj1)
        gameEnd = checkLifeline(obj, obj1)
        let temp = obj
        obj = obj1
        obj1 = temp
        let temp1 = player1_img
        player1_img= player2_img
        player2_img = temp1
        let temp3 = model
        model= model2
        model2 = temp3
        writeOnConsole(` ${obj.heroName} turn`, console_status)
    })
}

/**
 *Start Battle 
 * @param {Person} obj -player 1
 * @param {Person} obj1 - player 2
 */
let startBattle = (obj, obj1) => {
    document.getElementById("player1_health").id=`${obj.heroName.replace(" ","")}_health`
    document.getElementById("player2_health").id=`${obj1.heroName.replace(" ","")}_health`
    selectPlayer.style.display = "none"
    main_game.removeAttribute("style")
    writeOnConsole(`The Battle between ${hero.heroName}and ${hero2.heroName} has started`, console_status)
    setBackGroundImg(backGround)
    drawStat(stat, hero)
    drawStat(stat_1, hero2)
    attacker = selectFirstPlayerTurn(hero, hero2)
    writeOnConsole(`${attacker.heroName} start first`, console_status)
    if (attacker == obj) {
        defender = obj1
     
    } else {
        attacker=obj1
        defender = obj
       
    }
    takeAction(attacker, defender)
}
/**
 * Create dynamic select vs player2 menu
 */
let createMenuSelect = () => {
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
/**
 * Create dynamic select vs Bot
 */
let createMenuBot = () => {
    
    gameTitle.style.display = "none"
    selectPlayer.removeAttribute("style")
    document.getElementById("player2Create").style.display="none"
    createRaceList(racesList, url_class)
    createRaceList(racesLlist2, url_class)
    racesList.addEventListener("change", () => {
        clearItemSelect(itemlist)
        let selected = racesList.value
        createItemList(itemlist, url_item, selected)
        document.getElementById("class_container").style.display = "none"
        document.getElementById("item_container").removeAttribute("style")
    })
}
/**
 * Update Background Selection
 * @param {HtmlElement} element 
 * @param {String} bgname 
 */
let changeBackgroundPreview = (element, bgname) => {
        element.style.backgroundImage = `url('./src/image/background/PNG/game_background_${bgname}/game_background_${bgname}.png')`
        backGround = bgname
    }
/*
    Settings hide functioon
*/
let hide = () => {

        let menu = document.getElementById("menu_settings")
        menu.style.display = "none"
    }
    /**
    *      Is OPEN functioon
    * @returns {boolean} 
    */
let isopen = () => {
    let menu = document.getElementById("menu_settings")
    if (menu.style.display == "none") return false
    else return true
}
    /*
Open And Close settings pop up menu
*/

btnMenu.addEventListener("click", () => {
    if (!isopen()) {
        let menu = document.getElementById("menu_settings")
        menu.removeAttribute("style")
    } else { hide() }
})




//Start Main Load Event
window.addEventListener("load", () => {
    //setting menu
    btnReset.addEventListener("click",()=>{})
    sfxBtn.addEventListener("change",()=>{
    click.volume=0
    hit.volume=0
    hurt.volume=0})
    musicBtn.addEventListener("change",()=>{audioIntro.pause()})
    changeBackgroundPreview(backgroundPreviewImg, valueBackground)
    document.getElementById("vsP2").addEventListener("click", () => {
    audioIntro.play()
    createMenuSelect()
    //vs P2 mode
    addPlayer2Btn.addEventListener("click", () => {    
        //Selcet Player 1
        let hero_name = document.getElementById("name").value
        let hero_race = document.getElementById("races").value
        let hero_item = document.getElementById("item").value
        hero.heroName = hero_name
        hero.race = hero_race
        hero.item = hero_item
        updateRace(hero, url_class)
        updateItem(hero, url_item)
        model = selectModel(hero_race, hero_item)
        model = model.toString()
        addPlayer2Btn.disabled = true
        p1ready = true
        control()
    })
    //Select Background
    backgroundPreview.addEventListener("click", () => {
        valueBackground = backgroundPreview.value
        changeBackgroundPreview(backgroundPreviewImg, valueBackground)
    })
    //Selecet Player 2
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
        control()
    })
    // Star Battle
    startBtn.addEventListener("click", () => {
        startBattle(hero, hero2)
    })
    })
    document.getElementById("vsCPU").addEventListener("click", () => {
        //vs CPU mode
        createMenuBot()
        createBot(hero2)
        //Create Bot 
        addPlayer2Btn.addEventListener("click", () => {
            //sELECET pLAYER 1
            let hero_name = document.getElementById("name").value
            let hero_race = document.getElementById("races").value
            let hero_item = document.getElementById("item").value
            hero.heroName = hero_name
            hero.race = hero_race
            hero.item = hero_item
            updateRace(hero, url_class)
            updateItem(hero, url_item)
            model = selectModel(hero_race, hero_item)
            model = model.toString()
            addPlayer2Btn.disabled = true
            p1ready = true
            if (p1ready){
               //sTART VS bOT
                startBattleBot(hero, hero2)
            }
        })
    })
})


